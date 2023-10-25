import { prisma } from '../../prisma/client';
import { T_items } from '@prisma/client';

export const updateTransactionItemById = async (
  data: T_items
): Promise<void | Error> => {
  try {
    const transactionId = Number(data.t_item_tra_id);
    const existingTransaction = await prisma.transaction.findUnique({
      where: { tra_id: transactionId },
    });

    if (!existingTransaction || existingTransaction.tra_id !== transactionId) {
      throw new Error('Invalid request, transaction not found');
    }

    await prisma.t_items.update({
      where: { t_item_id: data.t_item_id },
      data,
    });

    return;
  } catch (error) {
    console.error('Error updating item:', error);
    throw new Error('Failed to update item');
  }
};
