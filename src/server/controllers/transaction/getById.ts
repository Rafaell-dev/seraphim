import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { getTransactionById } from '@providers/transaction/getById';

interface IParamsProps {
  tra_id?: number;
}

export const getByIdValidation = validation(getSchema => ({
  query: getSchema<IParamsProps>(
    yup.object().shape({
      tra_id: yup.number().positive().required(),
    })
  ),
}));

export const getTransactionByIdController = async (
  req: Request<IParamsProps>,
  res: Response
) => {
  const traId = req.params.tra_id;

  if (!traId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send('Transaction ID is required');
  }

  try {
    const result = await getTransactionById(traId);

    if (result instanceof Error) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: result.message });
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error('Error getting transaction:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error getting transaction' });
  }
};
