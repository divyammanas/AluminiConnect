import { User } from '../users/user.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { readAccessToken, verifyAccessToken } from './auth.tokens.js';

export const requireAuth = asyncHandler(async (request, _response, next) => {
  const token = readAccessToken(request);

  if (!token) throw new ApiError(401, 'Authentication required');

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    throw new ApiError(401, 'Your session has expired');
  }

  const user = await User.findById(payload.sub);
  if (!user || user.status !== 'active') {
    throw new ApiError(401, 'User account is unavailable');
  }

  request.user = user;
  next();
});

