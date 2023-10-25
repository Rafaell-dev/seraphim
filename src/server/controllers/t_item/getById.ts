import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { t_itemProvider } from '@server/database/providers';

interface IparamsProps {
  t_item_id?: number;
}

export const getByIdValidation = validation(getSchema => ({
  query: getSchema<IparamsProps>(
    yup.object().shape({
      t_item_id: yup.number().positive().required(),
    })
  ),
}));

export const getById = async (req: Request<IparamsProps>, res: Response) => {
  try {
    const { t_item_id } = req.params;

    const result = await t_itemProvider.getTransactionItemById(
      Number(t_item_id)
    );

    if (!result) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Item not found' });
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error('Error getting item:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error getting item' });
  }
};
