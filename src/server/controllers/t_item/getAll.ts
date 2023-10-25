import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { t_itemProvider } from '@server/database/providers';

interface IQueryProps {
  t_item_id?: number;
  page?: number;
  limit?: number;
  filter?: number;
}

const getAllValidationSchema = yup.object().shape({
  t_item_id: yup.number().integer().positive(),
  page: yup.number().integer().positive(),
  limit: yup.number().integer().positive(),
  filter: yup.number().integer().positive(),
});

export const getAllValidation = validation(getSchema => ({
  query: getSchema<IQueryProps>(getAllValidationSchema),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  try {
    const { page = 1, limit = 10, filter = 0, t_item_id = 0 } = req.query;

    // Validar parâmetros
    const validationError = await getAllValidationSchema.validate({
      page,
      limit,
      filter,
      t_item_id,
    });

    if (validationError) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid parameters', validationError });
    }

    const result = await t_itemProvider.getAllTransactionItems(
      page,
      limit,
      filter,
      t_item_id
    );

    if (result instanceof Error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: result.message });
    }

    return res.status(StatusCodes.OK).send(result);
  } catch (error) {
    console.error('Error getting items:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error getting items' });
  }
};
