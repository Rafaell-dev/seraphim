import { Transaction } from '@prisma/client';
import { prisma } from '../../prisma/client';

export const getAllTransactions = async (
  page: number,
  limit: number,
  filter: string,
  tra_id = 0
): Promise<Transaction[] | Error> => {
  try {
    const result = await prisma.transaction.findMany({
      where: {
        tra_id: tra_id || undefined, // Use undefined se tra_id for 0
        tra_status: { contains: filter },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        tra_client_id: 'asc',
      },
    });
    return result;
  } catch (error) {
    console.error('Error getting transactions:', error);
    throw new Error('Error getting transactions');
  }
};
