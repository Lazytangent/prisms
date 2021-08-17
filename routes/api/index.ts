import { Router } from 'express';

import usersRouter from './users';
import tweetsRouter from './tweets';
import sessionRouter from './session'

const router: Router = Router();

router.use('/users', usersRouter);
router.use('/tweets', tweetsRouter);
router.use('/session', sessionRouter);

export default router;
