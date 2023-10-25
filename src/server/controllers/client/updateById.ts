import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import * as yup from 'yup';
import { Client } from '@prisma/client';
import { clientsProvider } from '@server/database/providers';

const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/;

interface IBodyProps
  extends Partial<
    Omit<
      Client,
      | 'cli_id'
      | 'cli_createdAt'
      | 'cli_updatedAt'
      | 'cli_fantasia'
      | 'cli_razao'
      | 'cli_cnpj'
      | 'cli_zipcode'
      | 'cli_ibge'
      | 'cli_state'
      | 'cli_city'
      | 'cli_district'
      | 'cli_street'
      | 'cli_number'
      | 'cli_country'
    >
  > {}

export const updateByIdValidation = validation(getSchema => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      cli_type: yup.string().max(1),
      cli_cpf: yup.string().min(11),
      cli_cnpj: yup.string().notOneOf([], 'CNPJ is not allowed to person'),
      cli_fantasia: yup
        .string()
        .notOneOf([], 'Fantasia is not allowed to person'),
      cli_razao: yup.string().notOneOf([], 'Razão is not allowed to person'),
      cli_name: yup.string().min(3),
      cli_email: yup.string().email(),
      cli_phone: yup
        .string()
        .matches(phoneRegex, 'Phone number is not valid'),
      cli_password: yup.string().min(8),

      cli_zipcode: yup.string(),
      cli_ibge: yup.string(),
      cli_state: yup.string().max(2),
      cli_city: yup.string().min(3),
      cli_district: yup.string().min(3),
      cli_street: yup.string().min(3),
      cli_number: yup.string().min(1),
      cli_country: yup.number(),
    })
  ),
}));

export const updateById = async (req: Request<IBodyProps>, res: Response) => {
  try {
    if (!req.body.cli_id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Missing cli_id' });
    }
    const cliId = req.body.cli_id;
    if (req.body.cli_email) {
      const checkEmail = await clientsProvider.getClientByEmail(
        req.body.cli_email
      );
      if (checkEmail && checkEmail.cli_id === cliId) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'Email already in use' });
      }
    }

    const result = await clientsProvider.updateClientById(req.body);
    if (result instanceof Error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: result.message });
    }

    return res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    console.log(err);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error updating client' });
  }
};
