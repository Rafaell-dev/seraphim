import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { createTransaction } from '@providers/transaction/create';

import { Transaction } from '@prisma/client';

interface IBodyProps
  extends Omit<Transaction, 'tra_id' | 'tra_createdAt' | 'tra_updatedAt'> {}

export const createValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      tra_client_id: yup.number().required(),
      tra_services_id: yup.number().required(),
      tra_status: yup.string().required(),
      tra_total_value: yup.number().required(),
      tra_payment: yup.number().required(),
    })
  ),
}));

export const createTransactionController = async (
  req: Request<{}, IBodyProps>,
  res: Response
) => {
  try {
    const result = await createTransaction(req.body);
    return res.status(StatusCodes.CREATED).send(result);
  } catch (error) {
    console.error('Error creating transaction:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error creating transaction' });
  }
};
