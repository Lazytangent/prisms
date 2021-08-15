import type { Request, Response, NextFunction } from 'express';
import debug from 'debug';

export const debugLogger = (name: string) => {
  const debugLog: debug.IDebugger = debug(name);
  return (req: Request, _res: Response, next: NextFunction) => {
    debugLog(`${req.method} ${req.url}`);
    next();
  };
};
