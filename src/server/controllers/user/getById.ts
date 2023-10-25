import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { getUserById } from '@providers/user/getById';

interface ParamsProps {
  user_id?: number;
}

export const getByIdValidation = validation(getSchema => ({
  query: getSchema<ParamsProps>(
    yup.object().shape({
      user_id: yup.number().positive().required(),
    })
  ),
}));

export const getUserByIdController = async (
  req: Request<ParamsProps>,
  res: Response
) => {
  const userId = req.params.user_id;

  if (!userId) {
    return res.status(StatusCodes.BAD_REQUEST).send('User ID is required');
  }

  try {
    const user = await getUserById(userId);

    if (user instanceof Error) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: user.message });
    }

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error getting user' });
  }
};
