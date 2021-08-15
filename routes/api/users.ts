import type { Request, Response } from 'express';

import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { user } from '../../db';

const router: Router = Router();

router.get('', asyncHandler(async (_req: Request, res: Response) => {
  const users = await user.findMany();
  res.json(users);
}));

router.get('/:id(\\d+)', asyncHandler(async (req: Request, res: Response) => {
  const foundUser = await user.findUnique({ where: { id: +req.params.id } });
  res.json(foundUser);
}));

router.post('', asyncHandler(async (req: Request, res: Response) => {
  const { id } = await user.create(req.body);
  res.redirect(`${req.baseUrl}/${id}`);
}));

router.put('/:id(\\d+)', asyncHandler(async (req: Request, res: Response) => {
  const { id } = await user.update({ data: req.body, where: { id: +req.params.id } });
  res.redirect(`${req.baseUrl}/${id}`);
}));

router.delete('/:id(\\d+)', asyncHandler(async (req: Request, res: Response) => {
  await user.delete({ where: { id: +req.params.id } });
  res.json({ message: `Successfully deleted user with id: ${req.params.id}` });
}));

export default router;
