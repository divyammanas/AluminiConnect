import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { env, hasGoogleAuthConfig } from '../../config/env.js';
import { User } from '../users/user.model.js';

export const googleAuthConfigured = hasGoogleAuthConfig();

if (googleAuthConfigured) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: env.googleClientId,
        clientSecret: env.googleClientSecret,
        callbackURL: env.googleCallbackUrl
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value?.trim().toLowerCase();
          if (!email) return done(new Error('Google account did not provide an email address'));

          let user = await User.findOne({
            $or: [{ googleId: profile.id }, { email }]
          });

          if (!user) {
            user = new User({
              email,
              name: profile.displayName || email.split('@')[0],
              avatarUrl: profile.photos?.[0]?.value ?? '',
              googleId: profile.id,
              providers: ['google'],
              emailVerified: true,
              lastLoginAt: new Date()
            });
          } else {
            user.googleId = user.googleId || profile.id;
            user.name = user.name || profile.displayName;
            user.avatarUrl = user.avatarUrl || profile.photos?.[0]?.value || '';
            user.emailVerified = true;
            user.lastLoginAt = new Date();
            if (!user.providers.includes('google')) user.providers.push('google');
          }

          await user.save();
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}

