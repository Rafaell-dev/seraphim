import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { Service } from '@prisma/client';
import { serviceProvider } from '@server/database/providers';

interface IBodyProps
  extends Partial<Omit<Service, 'ser_createdAt' | 'ser_updatedAt'>> {}

export const updateByIdValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      ser_id: yup.number().positive().required(),
      ser_name: yup.string(),
      ser_description: yup.string(),
      ser_value: yup.number(),
    })
  ),
}));

export const updateById = async (req: Request<IBodyProps>, res: Response) => {
  const { ser_id } = req.body.ser_id;
  if (!ser_id) {
    return res.status(StatusCodes.BAD_REQUEST).send('Id is required');
  }
  try {
    const existingService = await serviceProvider.getServiceById(ser_id);

    if (existingService && existingService.ser_id !== Number(ser_id)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Request is not valid' });
    }
    const result = await serviceProvider.updateServiceById(req.body);
    if (result instanceof Error) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: result.message });
    }

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    console.log(err);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error updating service' });
  }
};
