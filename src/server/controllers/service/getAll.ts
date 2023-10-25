import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { serviceProvider } from '@server/database/providers';

interface IQueryProps {
  ser_id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation(getSchema => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      ser_id: yup.number().integer().positive(),
      page: yup.number().integer().positive(),
      limit: yup.number().integer().positive(),
      filter: yup.string().trim(),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  const result = await serviceProvider.getAllServices(
    req.query.page || 1,
    req.query.limit || 10,
    req.query.filter || '',
    Number(req.query.ser_id) || 0
  );
  if (result instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: result.message });
  }
  return res.status(StatusCodes.OK).send(result);
};
