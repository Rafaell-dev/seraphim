import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { T_items } from '@prisma/client';
import {
  t_itemProvider,
  transactionProvider,
} from '@server/database/providers';

interface IBodyProps
  extends Partial<Omit<T_items, 't_item_createdAt' | 't_item_updatedAt'>> {}

export const updateByIdValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      t_item_id: yup.number().required(),
      t_item_tra_id: yup.number().required(),
      t_item_ser_id: yup.number().required(),
      t_item_value: yup.number().required(),
      t_item_discount: yup.number().required(),
    })
  ),
}));

export const updateById = async (req: Request<IBodyProps>, res: Response) => {
  const t_item_tra_id = req.body.t_item_tra_id;
  try {
    const existingTransaction = await transactionProvider.getTransactionById(
      t_item_tra_id
    );

    if (!existingTransaction) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Request is not valid' });
    }
    const result = await t_itemProvider.updateTransactionItemById(req.body);
    if (result instanceof Error) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: result.message });
    }

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    console.log(err);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error updating client' });
  }
};
