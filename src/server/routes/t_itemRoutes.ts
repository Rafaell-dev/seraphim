import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { t_itemController } from '@controllers/index';

const t_itemRouter = Router();

t_itemRouter.get('/', (_, res) => {
  return res.status(StatusCodes.OK).send('Welcome to SERAPHIM v1!');
});

t_itemRouter.post(
  '/transactions',
  //authenticateToken,
  t_itemController.createValidation,
  t_itemController.create
);
t_itemRouter.get(
  '/transactions',
  t_itemController.getAllValidation,
  t_itemController.getAll
);
t_itemRouter.get(
  '/transactions/:transaction_id',
  t_itemController.getByIdValidation,
  t_itemController.getById
);
t_itemRouter.put(
  '/transactions/:transaction_id',
  t_itemController.updateByIdValidation,
  t_itemController.updateById
);
t_itemRouter.delete(
  '/transactions/:transaction_id',
  t_itemController.deleteByIdValidation,
  t_itemController.deleteById
);

export default t_itemRouter;
