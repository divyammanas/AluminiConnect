import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import { apiRouter } from './routes/index.js';

export const app = express();
const frontendDistPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../frontend/dist'
);

app.set('trust proxy', 1);
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      if (!origin || env.clientUrls.includes(origin)) return callback(null, true);
      return callback(new Error('Origin is not allowed by CORS'));
    }
  })
);
app.use(
  rateLimit({
    limit: 150,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    windowMs: 15 * 60 * 1000
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.use('/api/v1', apiRouter);
app.use(express.static(frontendDistPath));
app.use((request, response, next) => {
  const isFrontendRoute =
    request.method === 'GET' &&
    !request.path.startsWith('/api/') &&
    extname(request.path) === '';

  if (!isFrontendRoute) return next();

  return response.sendFile(resolve(frontendDistPath, 'index.html'), (error) => {
    if (error) next(error);
  });
});
app.use(notFound);
app.use(errorHandler);
