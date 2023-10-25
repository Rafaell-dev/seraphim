import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { updateUserById } from '@providers/user/updateById';
import getUserByEmail from '@server/database/providers/user/getByEmail';
import { User } from '@prisma/client';

interface IBodyProps extends Omit<User, 'user_createdAt' | 'user_updatedAt'> {}

export const updateByIdValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      user_id: yup.number().required(),
      user_name: yup.string().required(),
      user_email: yup.string().email().required(),
      user_password: yup.string().required(),
      user_group_id: yup.number().positive().required(),
    })
  ),
}));

export const updateUserByIdController = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const userId = req.body.user_id;

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Missing user_id' });
  }

  try {
    const checkEmail = await getUserByEmail(req.body.user_email);
    if (checkEmail && checkEmail.user_id === userId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Email already in use' });
    }
    const result = await updateUserById(req.body);
    
    if (result instanceof Error) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: result.message });
    }

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    console.error('Error updating user:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error updating user' });
  }
};
