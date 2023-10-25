import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { t_itemProvider } from '@server/database/providers';

interface RequestBody {
  t_item_id: number;
}

export const deleteByIdValidation = validation(getSchema => ({
  params: getSchema<RequestBody>(
    yup.object().shape({
      t_item_id: yup.number().positive().required(),
    })
  ),
}));

export const deleteById = async (
  req: Request<{}, {}, RequestBody>,
  res: Response
) => {
  if (!req.body.t_item_id) {
    return res.status(StatusCodes.BAD_REQUEST).send('Id is required');
  }
  try {
    const checkTItem = await t_itemProvider.getTransactionItemById(
      req.body.t_item_id
    );
    if (!checkTItem) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Invalid request, transaction item not found' });
    }
    const t_itemId = req.body.t_item_id;
    await t_itemProvider.deleteTransactionItemById(t_itemId);

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    console.log('Error deleting item:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error deleting item' });
  }
};
