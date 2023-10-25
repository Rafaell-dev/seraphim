import { Client } from '@prisma/client';
import { prisma } from '../../prisma/client';

export const getClientById = async (cliId: number): Promise<Client | void> => {
  try {
    const client = await prisma.client.findUnique({
      where: {
        cli_id: cliId,
      },
    });
   return client || undefined;
  } catch (error) {
    console.error('Error getting client by ID:', error);
    throw new Error('Error getting client by ID');
  }
};
