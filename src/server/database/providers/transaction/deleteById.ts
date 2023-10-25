import { prisma } from '../../prisma/client';

export const deleteTransactionById = async (
  tra_id: number
): Promise<void | Error> => {
  try {
    const traId = Number(tra_id);
    await prisma.transaction.delete({
      where: {
        tra_id: traId,
      },
    });
    return;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw new Error('Error deleting transaction');
  }
};
