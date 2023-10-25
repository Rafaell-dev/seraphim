import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { serviceProvider } from '@server/database/providers';

interface IparamsProps {
  ser_id?: number;
}

export const getByIdValidation = validation(getSchema => ({
  query: getSchema<IparamsProps>(
    yup.object().shape({
      ser_id: yup.number().positive().required(),
    })
  ),
}));

export const getById = async (req: Request<IparamsProps>, res: Response) => {
  if (!req.params.ser_id) {
    return res.status(StatusCodes.BAD_REQUEST).send('Id is required');
  }
  try {
    const result = await serviceProvider.getServiceById(req.params.ser_id);
    if (result instanceof Error) {
      res.status(StatusCodes.NOT_FOUND).json({ error: result.message });
    } else {
      res.status(StatusCodes.OK).json(result);
    }
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error getting user' });
  }
};
