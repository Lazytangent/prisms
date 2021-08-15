import type { Request, Response } from 'express';

import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import prisma from '../../db';

const router: Router = Router();

router.get('', asyncHandler(async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
}));

export default router;
