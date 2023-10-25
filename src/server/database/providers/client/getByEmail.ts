import { Client } from '@prisma/client';
import { prisma } from '../../prisma/client';

export const getClientByEmail = async (
  cliEmail: string
): Promise<Client | null> => {
  try {
    const client = await prisma.client.findUnique({
      where: {
        cli_email: cliEmail,
      },
    });
    return client || null;
  } catch (error) {
    console.error('Error getting client by email:', error);
    throw new Error('Error getting client by email');
  }
};
