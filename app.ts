import express from 'express';
import expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';

import { loggerOptions } from './config/logger-options';
import routes from './routes';
import { CustomError } from './types/app';

const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use(expressWinston.logger(loggerOptions));
app.use(routes);

app.use((_req: express.Request, _res: express.Response, next: express.NextFunction) => {
  const err = new CustomError("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

module.exports = app;
