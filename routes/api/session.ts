import type { Request, Response } from 'express';

import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { user } from '../../db';

const router: Router = Router();

router.get('', asyncHandler(async (req: Request, res: Response) => {
  res.json(req.session);
}));

export default router;
