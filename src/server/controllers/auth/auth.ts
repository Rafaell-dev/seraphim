import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { authProvider } from '@server/database/providers';
import { User } from '@prisma/client';

interface IBodyProps
  extends Omit<
    User,
    | 'user_id'
    | 'user_createdAt'
    | 'user_updatedAt'
    | 'user_name'
    | 'user_group_id'
  > {}
export const createValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      user_email: yup.string().required().email(),
      user_password: yup.string().required().min(8),
    })
  ),
}));

export const authPassword = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const token = await authProvider(req.body);
  if (token instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: token.message });
  }
  return res.status(StatusCodes.OK).send(token);
};
