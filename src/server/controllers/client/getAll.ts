import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { clientsProvider } from '@server/database/providers';
import {
  GetClientsParams,
} from '@server/database/providers/client/getAll';

interface IQueryProps {
  cli_id?: number;
  page?: number;
  limit?: number;
  filter?: string;
  cli_cpf?: string;
  cli_cnpj?: string;
}

export const getAllValidation = validation(getSchema => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      cli_id: yup.number().integer().positive(),
      page: yup.number().integer().positive(),
      limit: yup.number().integer().positive(),
      filter: yup.string().trim(),
      cli_cpf: yup.string().trim(),
      cli_cnpj: yup.string().trim(),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  const params: GetClientsParams = {
    page: req.query.page,
    limit: req.query.limit,
    filters: {
      name_filter: req.query.filter,
      cli_id: req.query.cli_id,
      cli_cpf: req.query.cli_cpf,
      cli_cnpj: req.query.cli_cnpj,
    },
  };
  const result = await clientsProvider.getClients(params);
  if (result instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: result.message });
  }
  return res.status(StatusCodes.OK).send(result);
};
