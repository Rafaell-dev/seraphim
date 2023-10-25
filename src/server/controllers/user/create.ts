import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { createUser } from '@providers/user/create'; // Importando a função refatorada.
import { User } from '@prisma/client';
import getUserByEmail from '@server/database/providers/user/getByEmail';

interface IBodyProps
  extends Omit<User, 'user_id' | 'user_createdAt' | 'user_updatedAt'> {}

export const createValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      user_name: yup.string().required().min(3),
      user_email: yup.string().required().email(),
      user_password: yup.string().required().min(8),
      user_group_id: yup.number().required(),
      
    })
  ),
}));

export const createUserController = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  try {
    const checkEmail = await getUserByEmail(req.body.user_email);
    if (checkEmail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Email already in use' });
    }
    const result = await createUser(req.body);
    return res.status(StatusCodes.CREATED).send(result);
  } catch (error) {
    console.error('Error creating user:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error creating user' });
  }
};
