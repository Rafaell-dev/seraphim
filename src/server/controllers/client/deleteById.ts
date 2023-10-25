import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { clientsProvider } from '@server/database/providers';

interface IparamsProps {
  cli_id?: number;
}

export const deleteByIdValidation = validation(getSchema => ({
  params: getSchema<IparamsProps>(
    yup.object().shape({
      cli_id: yup.number().positive().required(),
    })
  ),
}));

export const deleteById = async (req: Request<IparamsProps>, res: Response) => {
  try {
    if (!req.params.cli_id) {
      return res.status(StatusCodes.BAD_REQUEST).send('Id is required');
    }
    const cli_id = req.params.cli_id;
    const result = await clientsProvider.deleteClientById(cli_id);
    if (result instanceof Error) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: result.message });
    }

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error deleting user' });
  }
};
