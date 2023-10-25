import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { authController } from '@controllers/index';
import { authenticateToken } from '@server/shared/middleware';

const authRouter = Router();

authRouter.post(
  '/auth',
  //authenticateToken,
  authController.authPassword
);

export default authRouter;
