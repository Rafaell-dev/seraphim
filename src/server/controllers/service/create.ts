import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { serviceProvider } from '@server/database/providers';

import { Service } from '@prisma/client';

interface IBodyProps
  extends Omit<Service, 'ser_id' | 'ser_createdAt' | 'ser_updatedAt'> {}

export const createValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      ser_name: yup.string().required(),
      ser_description: yup.string().required(),
      ser_value: yup.number().required(),
    })
  ),
}));

export const create = async (req: Request<{}, IBodyProps>, res: Response) => {
  const result = await serviceProvider.createService(req.body);

  return res.status(StatusCodes.CREATED).send(result);
};
