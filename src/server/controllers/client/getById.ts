import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { clientsProvider } from '@server/database/providers';

interface IparamsProps {
  cli_id?: number;
}

export const getByIdValidation = validation(getSchema => ({
  query: getSchema<IparamsProps>(
    yup.object().shape({
      cli_id: yup.number().positive().required(),
    })
  ),
}));

export const getById = async (req: Request<IparamsProps>, res: Response) => {
  if (!req.params.cli_id) {
    return res.status(StatusCodes.BAD_REQUEST).send('Id is required');
  }
  try {
    const result = await clientsProvider.getClientById(req.params.cli_id);
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
