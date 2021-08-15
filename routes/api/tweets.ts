import type { Request, Response } from 'express';

import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from "@prisma/client";

const router: Router = Router();
const prisma = new PrismaClient();

router.get('', asyncHandler(async (_req: Request, res: Response) => {
  const tweets = await prisma.tweet.findMany();
  res.json(tweets);
}));

export default router;
