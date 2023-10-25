import { Client } from '@prisma/client';
import { prisma } from '../../prisma/client';
import HashPassword from '@services/HashPassword';

export const createClient = async (
  client: Omit<Client, 'cli_id' | 'cli_createdAt' | 'cli_updatedAt'>
): Promise<String | Object | Error> => {
  try {
    const hashedPassword = await HashPassword(client.cli_password);

    const newClient = {
      ...client,
      cli_password: hashedPassword,
    };

    const result = await prisma.client.create({
      data: newClient,
    });

    return { cli_id: result.cli_id, cli_email: result.cli_email };
  } catch (error) {
    console.error('Error creating client:', error);
    return new Error('Error creating client');
  }
};
