import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { ApiError } from '../../utils/ApiError.js';

const ACCESS_COOKIE = 'alumni_access_token';
const REFRESH_COOKIE = 'alumni_refresh_token';

function commonCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: env.nodeEnv === 'production'
  };
}

export function issueAuthCookies(response, user) {
  if (!env.jwtAccessSecret || !env.jwtRefreshSecret) {
    throw new ApiError(503, 'JWT authentication is not configured');
  }

  const payload = { role: user.role };
  const accessToken = jwt.sign(payload, env.jwtAccessSecret, {
    expiresIn: env.jwtAccessExpiresIn,
    subject: user.id
  });
  const refreshToken = jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: env.jwtRefreshExpiresIn,
    subject: user.id
  });

  response.cookie(ACCESS_COOKIE, accessToken, {
    ...commonCookieOptions(),
    maxAge: 15 * 60 * 1000,
    path: '/'
  });
  response.cookie(REFRESH_COOKIE, refreshToken, {
    ...commonCookieOptions(),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/api/v1/auth'
  });
}

export function clearAuthCookies(response) {
  response.clearCookie(ACCESS_COOKIE, {
    ...commonCookieOptions(),
    path: '/'
  });
  response.clearCookie(REFRESH_COOKIE, {
    ...commonCookieOptions(),
    path: '/api/v1/auth'
  });
}

export function readAccessToken(request) {
  return request.cookies[ACCESS_COOKIE];
}

export function readRefreshToken(request) {
  return request.cookies[REFRESH_COOKIE];
}

export function verifyAccessToken(token) {
  return jwt.verify(token, env.jwtAccessSecret);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, env.jwtRefreshSecret);
}

