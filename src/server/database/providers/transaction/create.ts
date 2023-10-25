import { Transaction } from '@prisma/client';
import { prisma } from '../../prisma/client';

export const createTransaction = async (
  tra: Omit<Transaction, 'tra_id' | 'tra_createdAt' | 'tra_updatedAt'>
): Promise<Transaction | Error> => {
  try {
    const result = await prisma.transaction.create({
      data: {
        ...tra,
      },
    });

    return result;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw new Error('Error creating transaction');
  }
};
