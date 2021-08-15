import type { Request, Response } from 'express';

import { Router } from 'express';
import apiRouter from "./api";

const router: Router = Router();

router.use('/api', apiRouter);

export default router;
