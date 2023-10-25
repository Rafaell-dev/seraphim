import { Transaction } from '@prisma/client';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { updateTransactionById } from '@providers/transaction/updateById';
import { getTransactionById } from '@providers/transaction/getById';

interface IBodyProps
  extends Omit<Transaction, 'tra_createdAt' | 'tra_updatedAt'> {}

// Use uma função de validação reutilizável para manter o código limpo
export const updateByIdValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      tra_id: yup.number().required(),
      tra_client_id: yup.number().required(),
      tra_services_id: yup.number().required(),
      tra_status: yup.string().required(),
      tra_total_value: yup.number().required(),
      tra_payment: yup.number().required(),
    })
  ),
}));

export const updateTransactionByIdController = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const traId = req.body.tra_id;
  if (!traId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send('Transaction ID is required');
  }

  try {
    const existingTransaction = await getTransactionById(traId);

    if (!existingTransaction) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Transaction not found' });
    }

    const result = await updateTransactionById(req.body);

    if (result instanceof Error) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: result.message });
    }

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    console.error('Error updating transaction:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error updating transaction' });
  }
};
