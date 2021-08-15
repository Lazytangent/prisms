import type { Request, Response } from 'express';

import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from "@prisma/client";

const router: Router = Router();
const prisma = new PrismaClient();

router.get('', asyncHandler(async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
}));

export default router;
