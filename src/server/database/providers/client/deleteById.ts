import { prisma } from '../../prisma/client';

export const deleteClientById = async (
  cli_id: number
): Promise<void | Error> => {
  try {
    const clientId = Number(cli_id);
    const result = await prisma.client.delete({
      where: {
        cli_id: clientId,
      },
    });
    if (result) {
      return;
    } else {
      throw new Error('Client not found');
    }
  } catch (error) {
    console.error('Error deleting client:', error);
    throw new Error('Error deleting client');
  }
};
