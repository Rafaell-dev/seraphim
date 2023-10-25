import * as createTransaction from './create';
import * as deleteTransactionById from './deleteById';
import * as getAllTransactions from './getAll';
import * as getTransactionById from './getById';
import * as updateTransactionById from './updateById';
// import * as count from './Count';

export const transactionProvider = {
  ...createTransaction,
  ...getAllTransactions,
  ...getTransactionById,
  ...updateTransactionById,
  ...deleteTransactionById,
  // ...count,
};
