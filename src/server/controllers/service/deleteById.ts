import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { serviceProvider } from '@server/database/providers';

interface IparamsProps {
  ser_id?: number;
}

export const deleteByIdValidation = validation(getSchema => ({
  params: getSchema<IparamsProps>(
    yup.object().shape({
      ser_id: yup.number().positive().required(),
    })
  ),
}));

export const deleteById = async (req: Request<IparamsProps>, res: Response) => {
   if (!req.params.ser_id) {
     return res.status(StatusCodes.BAD_REQUEST).send('Id is required');
   }
  try {
    const ser_id = req.params.ser_id;
    const result = await serviceProvider.deleteServiceById(ser_id);
    if (result instanceof Error) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: result.message });
    }

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error deleting service' });
  }
};
