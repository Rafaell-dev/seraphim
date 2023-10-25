import { prisma } from '../../prisma/client';
import { Transaction } from '@prisma/client';

export const updateTransactionById = async (
  traData: Omit<Transaction, 'tra_createdAt' | 'tra_updatedAt'>
): Promise<void | Error> => {
  try {
    const traId = traData.tra_id;

    await prisma.transaction.update({
      where: { tra_id: traId },
      data: traData,
    });
    return;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw new Error('Error updating transaction');
  }
};
