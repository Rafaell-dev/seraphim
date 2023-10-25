import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { deleteTransactionById } from '@providers/transaction/deleteById';

interface RequestBody {
  tra_id: number;
}

export const deleteByIdValidation = validation(getSchema => ({
  body: getSchema<RequestBody>(
    yup.object().shape({
      tra_id: yup.number().positive().required(),
    })
  ),
}));

export const deleteTransactionByIdController = async (
  req: Request<{}, {}, RequestBody>,
  res: Response
) => {
  const traId = req.body.tra_id;

  try {
    if (!traId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Missing tra_id' });
    }

    await deleteTransactionById(traId);

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error deleting transaction' });
  }
};
