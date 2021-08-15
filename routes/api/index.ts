import { Router } from 'express';

import usersRouter from './users';
import tweetsRouter  from './tweets';

const router: Router = Router();

router.use('/users', usersRouter);
router.use('/tweets', tweetsRouter);

export default router;
