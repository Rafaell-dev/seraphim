import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { getAllUsers } from '@providers/user/getAll';

interface IQueryProps {
  user_id?: number;
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation(getSchema => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      user_id: yup.number().integer().positive(),
      page: yup.number().integer().positive(),
      limit: yup.number().integer().positive(),
      filter: yup.string().trim(),
    })
  ),
}));

export const getAllUsersController = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  try {
    const result = await getAllUsers({
      page: req.query.page || 1,
      limit: req.query.limit || 10,
      filter: req.query.filter || '',
      userId: Number(req.query.user_id) || 0,
    });

    return res.status(StatusCodes.OK).send(result);
  } catch (error) {
    console.error('Error getting users:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error getting users' });
  }
};
