import type { Request, Response, NextFunction } from 'express';

import express from 'express';
import expressWinston from 'express-winston';
import cors from 'cors';
import { Prisma } from '@prisma/client';

import { environment } from './config';
import { loggerOptions } from './config/logger-options';
import routes from './routes';
import { CustomError } from './types/app';
import { debugLogger } from "./utils/debug-logger";

const app: express.Application = express();
const isProduction = environment === 'production';

app.use(express.json());
app.use(cors());
app.use(expressWinston.logger(loggerOptions));
app.use(debugLogger('express'));
app.use(routes);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  const err = new CustomError("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

app.use((err: CustomError, _req: Request, _res: Response, next: NextFunction) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    err.errors = [err.message];
    err.title = 'Validation Error';
  }
  next(err);
});

app.use((err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const { title, message, errors, stack } = err;
  res.status(err.status || 500);
  console.log('\n\n');
  console.error(err);
  res.json({
    title: title || 'Server Error',
    message: message,
    errors,
    stack: isProduction ? null : stack,
  });
});

module.exports = app;
