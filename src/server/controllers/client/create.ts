import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { clientsProvider } from '@server/database/providers';
import { Client } from '@prisma/client';
import { GetClientsParams } from '@server/database/providers/client/getAll';

interface IBodyPropsCreateClient
  extends Omit<
    Client,
    | 'cli_id'
    | 'cli_createdAt'
    | 'cli_updatedAt'
    | 'cli_cpf'
    | 'cli_cnpj'
    | 'cli_fantasia'
    | 'cli_razao'
    | 'cli_name'
    | 'cli_ibge'
    | 'cli_ibgecode'
    | 'cli_country'
    | 'cli_state'
    | 'cli_city'
    | 'cli_district'
    | 'cli_street'
    | 'cli_number'
    | 'cli_zipcode'
  > {}

const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/;

const createSchema = yup.object().shape({
  cli_type: yup.string().required().max(1),
  cli_cpf: yup.string().notRequired().min(3),
  cli_cnpj: yup.string().notRequired().min(14),
  cli_fantasia: yup.string().notRequired().min(3),
  cli_razao: yup.string().notRequired().min(3),
  cli_name: yup.string().notRequired().min(3),
  cli_email: yup.string().required().email(),
  cli_phone: yup
    .string()
    .matches(phoneRegex, 'Phone number is not valid')
    .required(),
  cli_password: yup.string().required().min(8),

  cli_zipcode: yup.string().notRequired().min(3),
  cli_ibge: yup.string().notRequired().min(3),
  cli_state: yup.string().notRequired().min(3),
  cli_city: yup.string().notRequired().min(3),
  cli_district: yup.string().notRequired().min(3),
  cli_street: yup.string().notRequired().min(3),
  cli_number: yup.string().notRequired().min(3),
  cli_country: yup.number().notRequired().min(3),
});

export const SchemaValidation = validation(getSchema => ({
  body: getSchema<IBodyPropsCreateClient>(createSchema),
}));

export const validate = async (
  req: Request<{}, IBodyPropsCreateClient>,
  res: Response,
  next: NextFunction
) => {
  const errorsResult: Record<string, Record<string, string>> = {};
  const validationErrors: Record<string, string> = {}; // Variável para armazenar erros de validação

  // Validações condicionais
  if (req.body.cli_type === 'F') {
    if (!req.body.cli_cpf || !req.body.cli_name) {
      validationErrors['error'] = 'CPF and Name is required';
    }
    if (req.body.cli_cnpj || req.body.cli_fantasia || req.body.cli_razao) {
      validationErrors['error'] = 'Invalid request body';
    }
  } else if (req.body.cli_type === 'J') {
    if (!req.body.cli_cnpj || !req.body.cli_fantasia || !req.body.cli_razao) {
      validationErrors['error'] =
        'CNPJ, Fantasia and Razão is required for Juridical client';
    }
    if (req.body.cli_cpf || req.body.cli_name) {
      validationErrors['error'] = 'Invalid request body';
    }
    if (!req.body.cli_type) {
      validationErrors['error'] =
        'Invalid request body, is missing client type';
    }
  }

  // Tratamento dos erros de validação
  if (Object.keys(validationErrors).length > 0) {
    errorsResult['error'] = validationErrors;
  }

  // Limpeza e formatação dos valores de string
  Object.entries(req.body).forEach(([key, value]) => {
    if (typeof value === 'string') {
      req.body[key] = value.trim();
    }
  });

  if (Object.entries(errorsResult).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
  }
};

export const validatePrimaryKeys = async (
  req: Request<{}, IBodyPropsCreateClient>,
  res: Response,
  next: NextFunction
) => {
  try {
    const params: GetClientsParams = {
      filters: {
        cli_cpf: req.body.cli_cpf,
        cli_cnpj: req.body.cli_cnpj,
      },
    };

    const checkEmail = await clientsProvider.getClientByEmail(
      req.body.cli_email
    );
    if (checkEmail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Email already in use' });
    }

    if (req.body.cli_type === 'F') {
      const checkCpf = await clientsProvider.getClients({
        filters: { cli_cpf: params.filters.cli_cpf },
      });
      if (checkCpf.length > 0) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'CPF already in use' });
      }
    }

    if (req.body.cli_type === 'J' && params.filters.cli_cnpj) {
      const checkCnpj = await clientsProvider.getClients(params);
      if (checkCnpj !== null) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: 'CNPJ already in use' });
      }
    }
    next();
  } catch (error) {
    console.error('Error validating primary keys:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error' });
  }
};

export const create = async (
  req: Request<{}, IBodyPropsCreateClient>,
  res: Response
) => {
  try {
    const result = await clientsProvider.createClient(req.body);
    return res.status(StatusCodes.CREATED).send(result);
  } catch (error) {
    // Lida com erros inesperados
    console.error('Error creating client:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error' });
  }
};
