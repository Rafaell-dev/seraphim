import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { t_itemProvider } from '@server/database/providers';

import { T_items } from '@prisma/client';

interface IBodyProps
  extends Omit<
    T_items,
    't_item_id' | 't_item_createdAt' | 't_item_updatedAt'
  > {}

export const createValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      t_item_tra_id: yup.number().required(),
      t_item_ser_id: yup.number().required(),
      t_item_value: yup.number().required(),
      t_item_discount: yup.number().required(),
    })
  ),
}));

export const create = async (req: Request<{}, IBodyProps>, res: Response) => {
  try {
    const checkTransaction = await t_itemProvider.getTransactionItemById(
      req.body.t_item_tra_id
    );
    if (!checkTransaction) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid request, transaction not found' });
    }
    const result = await t_itemProvider.createTransactionItem(req.body);
    return res.status(StatusCodes.CREATED).send(result);
  } catch (error) {
    console.error('Error creating transaction item:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error creating transaction item' });
  }
};
