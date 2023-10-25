import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { transactionController } from '@controllers/index';

const transactionRouter = Router();

transactionRouter.get('/', (_, res) => {
  return res.status(StatusCodes.OK).send('Welcome to SERAPHIM v1!');
});

transactionRouter.post(
  '/transactions',
  //authenticateToken,
  transactionController.createValidation,
  transactionController.createTransactionController
);
transactionRouter.get(
  '/transactions',
  transactionController.getAllValidation,
  transactionController.getAllTransactionsController
);
transactionRouter.get(
  '/transactions/:transaction_id',
  transactionController.getByIdValidation,
  transactionController.getTransactionByIdController
);
transactionRouter.put(
  '/transactions/:transaction_id',
  transactionController.updateByIdValidation,
  transactionController.updateTransactionByIdController
);
transactionRouter.delete(
  '/transactions',
  transactionController.deleteByIdValidation,
  transactionController.deleteTransactionByIdController
);

export default transactionRouter;
