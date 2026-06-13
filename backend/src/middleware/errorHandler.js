import { env } from '../config/env.js';

export function errorHandler(error, _request, response, _next) {
  const statusCode = error.statusCode ?? 500;
  const isProduction = env.nodeEnv === 'production';

  if (statusCode >= 500) console.error(error);

  response.status(statusCode).json({
    error: {
      message: statusCode >= 500 && isProduction ? 'Internal server error' : error.message,
      ...(error.details ? { details: error.details } : {}),
      ...(!isProduction && error.stack ? { stack: error.stack } : {})
    }
  });
}

