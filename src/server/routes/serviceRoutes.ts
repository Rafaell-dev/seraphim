import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { serviceController } from '@controllers/index';
import { authenticateToken } from '@server/shared/middleware';

const serviceRouter = Router();

serviceRouter.get('/', (_, res) => {
  return res.status(StatusCodes.OK).send('Welcome to SERAPHIM v1!');
});

serviceRouter.post(
  '/transactions',
  //authenticateToken,
  serviceController.createValidation,
  serviceController.create
);
serviceRouter.get(
  '/transactions',
  serviceController.getAllValidation,
  serviceController.getAll
);
serviceRouter.get(
  '/transactions/:transaction_id',
  serviceController.getByIdValidation,
  serviceController.getById
);
serviceRouter.put(
  '/transactions/:transaction_id',
  serviceController.updateByIdValidation,
  serviceController.updateById
);
serviceRouter.delete(
  '/transactions/:transaction_id',
  serviceController.deleteByIdValidation,
  serviceController.deleteById
);

export default serviceRouter;
