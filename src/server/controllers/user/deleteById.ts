import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { deleteUserById } from '@providers/user/deleteById';

interface RequestBody {
  user_id?: number;
}

export const deleteByIdValidation = validation(getSchema => ({
  body: getSchema<RequestBody>(
    yup.object().shape({
      user_id: yup.number().positive().required(),
    })
  ),
}));

export const deleteUserByIdController = async (
  req: Request<{}, {}, RequestBody>,
  res: Response
) => {
  console.log(Number(req.body.user_id));
  const userId = req.body.user_id;

  if (!userId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: 'Missing user_id' });
  }
  try {
    await deleteUserById(userId);

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    console.error('Error deleting user:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error deleting user' });
  }
};
