import { Transaction } from '@prisma/client';
import { prisma } from '../../prisma/client';

export const getTransactionById = async (
  traId: number
): Promise<Transaction | void> => {
  try {
    const result = await prisma.transaction.findUnique({
      where: {
        tra_id: traId,
      },
    });
    if (result) return result;
    return;
  } catch (error) {
    console.error('Error getting transaction:', error);
    throw new Error('Error getting transaction');
  }
};
