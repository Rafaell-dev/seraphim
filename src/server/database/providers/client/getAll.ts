import { Client } from '@prisma/client';
import { prisma } from '../../prisma/client';

export interface GetAllClientsParams {
  name_filter?: string;
  cli_id?: number;
  cli_cpf?: string;
  cli_cnpj?: string;
}

export interface GetClientsFilter {
  name_filter?: string;
  cli_id?: number;
  cli_name?: string;
  cli_cpf?: string;
  cli_cnpj?: string;
}

export interface GetClientsParams {
  page?: number;
  limit?: number;
  filters: GetClientsFilter;
}

export const getClients = async ({
  page = 1,
  limit = 10,
  filters,
}: GetClientsParams): Promise<Client[]> => {
  try {
    const clients = await prisma.client.findMany({
      where: {
        ...filters,
      },
      skip: (page - 1) * limit as number,
      take: limit as number,
    });
    return clients;
  } catch (error) {
    console.error('Error getting clients:', error);
    throw new Error('Error getting clients');
  }
};
