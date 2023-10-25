import { T_items } from '@prisma/client';
import { prisma } from '../../prisma/client';

export const getTransactionItemById = async (
  tItemId: number
): Promise<T_items | void> => {
  try {
    const result = await prisma.t_items.findUnique({
      where: {
        t_item_id: tItemId,
      },
    });
    if (result) return result;
    return;
  } catch (error) {
    console.error('Error getting transaction item:', error);
    throw new Error('Failed to retrieve transaction item');
  }
};
