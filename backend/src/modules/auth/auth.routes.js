import { randomBytes, timingSafeEqual } from 'node:crypto';
import { Router } from 'express';
import passport from 'passport';
import { env } from '../../config/env.js';
import { ApiError } from '../../utils/ApiError.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { User } from '../users/user.model.js';
import { requireAuth } from './auth.middleware.js';
import {
  clearAuthCookies,
  issueAuthCookies,
  readRefreshToken,
  verifyRefreshToken
} from './auth.tokens.js';
import { googleAuthConfigured } from './google.strategy.js';
import { verifyFirebaseIdToken } from '../../utils/verifyFirebase.js';

export const authRouter = Router();

const STATE_COOKIE = 'google_oauth_state';

function frontendUrl(pathname) {
  return new URL(pathname, env.clientUrls[0]).toString();
}

function stateCookieOptions() {
  return {
    httpOnly: true,
    maxAge: 10 * 60 * 1000,
    sameSite: 'lax',
    secure: env.nodeEnv === 'production'
  };
}

function requireGoogleConfig(_request, _response, next) {
  if (!googleAuthConfigured) {
    return next(
      new ApiError(
        503,
        'Google authentication needs MongoDB, Google OAuth, and JWT environment variables'
      )
    );
  }
  return next();
}

function verifyOAuthState(request, response, next) {
  const expected = request.cookies[STATE_COOKIE] ?? '';
  const received = typeof request.query.state === 'string' ? request.query.state : '';
  response.clearCookie(STATE_COOKIE, stateCookieOptions());

  const valid =
    expected.length === received.length &&
    expected.length > 0 &&
    timingSafeEqual(Buffer.from(expected), Buffer.from(received));

  if (!valid) return response.redirect(frontendUrl('/sign-in?error=invalid_oauth_state'));
  return next();
}

authRouter.get('/providers', (_request, response) => {
  response.json({ data: { google: { configured: googleAuthConfigured } } });
});

authRouter.get('/google', requireGoogleConfig, (request, response, next) => {
  const state = randomBytes(32).toString('hex');
  response.cookie(STATE_COOKIE, state, stateCookieOptions());

  passport.authenticate('google', {
    prompt: 'select_account',
    scope: ['profile', 'email'],
    session: false,
    state
  })(request, response, next);
});

authRouter.get(
  '/google/callback',
  requireGoogleConfig,
  verifyOAuthState,
  passport.authenticate('google', {
    failureRedirect: frontendUrl('/sign-in?error=google_auth_failed'),
    session: false
  }),
  (request, response) => {
    issueAuthCookies(response, request.user);
    response.redirect(frontendUrl('/auth/callback'));
  }
);

authRouter.post(
  '/firebase',
  asyncHandler(async (request, response) => {
    const { idToken } = request.body;
    if (!idToken) throw new ApiError(400, 'Firebase ID token is required');

    let payload;
    try {
      payload = await verifyFirebaseIdToken(idToken);
    } catch (error) {
      throw new ApiError(401, `Invalid Firebase ID token: ${error.message}`);
    }

    const email = payload.email?.trim().toLowerCase();
    if (!email) throw new ApiError(400, 'Firebase ID token did not provide an email address');

    let user = await User.findOne({
      $or: [{ firebaseUid: payload.sub }, { email }]
    });

    if (!user) {
      user = new User({
        email,
        name: payload.name || email.split('@')[0],
        avatarUrl: payload.picture ?? '',
        firebaseUid: payload.sub,
        providers: ['firebase'],
        emailVerified: payload.email_verified ?? true,
        lastLoginAt: new Date()
      });
    } else {
      user.firebaseUid = user.firebaseUid || payload.sub;
      user.name = user.name || payload.name;
      user.avatarUrl = user.avatarUrl || payload.picture || '';
      user.emailVerified = payload.email_verified ?? true;
      user.lastLoginAt = new Date();
      if (!user.providers.includes('firebase')) user.providers.push('firebase');
    }

    await user.save();

    issueAuthCookies(response, user);
    response.json({ data: { user: user.toJSON() } });
  })
);

authRouter.get('/me', requireAuth, (request, response) => {
  response.json({ data: { user: request.user.toJSON() } });
});

authRouter.post(
  '/refresh',
  asyncHandler(async (request, response) => {
    const token = readRefreshToken(request);
    if (!token) throw new ApiError(401, 'Refresh token is missing');

    let payload;
    try {
      payload = verifyRefreshToken(token);
    } catch {
      clearAuthCookies(response);
      throw new ApiError(401, 'Refresh token is invalid or expired');
    }

    const user = await User.findById(payload.sub);
    if (!user || user.status !== 'active') throw new ApiError(401, 'User unavailable');

    issueAuthCookies(response, user);
    response.json({ data: { user: user.toJSON() } });
  })
);

authRouter.post('/logout', (_request, response) => {
  clearAuthCookies(response);
  response.status(204).end();
});

