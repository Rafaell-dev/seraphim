import * as createClient from './create';
import * as deleteClientById from './deleteById';
import * as getAllClients from './getAll';
import * as getClientById from './getById';
import * as updateClientById from './updateById';
import * as getClientByEmail from './getByEmail';
import * as getClientByIdDoc from './getByIdDoc';

export const clientsProvider = {
  ...createClient,
  ...getAllClients,
  ...getClientById,
  ...updateClientById,
  ...deleteClientById,
  ...getClientByEmail,
  ...getClientByIdDoc,
};
