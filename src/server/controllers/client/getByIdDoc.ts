import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { clientsProvider } from '@server/database/providers';

interface IparamsProps {
  cli_id_doc?: string;
}

export const getByIdDocValidation = validation(getSchema => ({ 
  query: getSchema<IparamsProps>(
    yup.object().shape({
      cli_id_doc: yup.string().required(),
    })
  ),
}));

export const getByIdDoc = async (req: Request<IparamsProps>, res: Response) => {
  try {
    if (!req.params.cli_id_doc) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send('Identifier document is required');
    }
    const result = await clientsProvider.getClientByIdDoc(
      req.params.cli_id_doc
    );
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
