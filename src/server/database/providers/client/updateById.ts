import { Client } from '@prisma/client';
import { prisma } from '../../prisma/client';
import HashPassword from '@services/HashPassword';

export const updateClientById = async (
  updatedClient: Client
): Promise<void | Error> => {
  try {
    const clientId = updatedClient.cli_id;

    if (updatedClient.cli_password) {
      const hashedPassword = await HashPassword(updatedClient.cli_password);
      updatedClient.cli_password = hashedPassword;
    }

    const existingClient = await prisma.client.findUnique({
      where: { cli_id: clientId },
    });

    if (!existingClient) {
      throw new Error('Client not found');
    }

    await prisma.client.update({
      where: { cli_id: clientId },
      data: updatedClient,
    });

    return;
  } catch (error) {
    console.error('Error updating client:', error);
    throw new Error('Error updating client');
  }
};
