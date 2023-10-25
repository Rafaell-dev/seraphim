import { Client } from '@prisma/client';
import { prisma } from '../../prisma/client';

export const getClientByIdDoc = async (
  cliIdDoc: string
): Promise<Client | void> => {
  try {
    if (cliIdDoc.length < 11) {
      const clientCPF = await prisma.client.findUnique({
        where: {
          cli_cpf: cliIdDoc,
        },
      });
      return clientCPF || undefined;
    } else {
      const clientCNPJ = await prisma.client.findUnique({
        where: {
          cli_cnpj: cliIdDoc,
        },
      });
      return clientCNPJ || undefined;
    }
  } catch (error) {
    console.error('Error getting client by ID:', error);
    throw new Error('Error getting client by ID');
  }
};
''