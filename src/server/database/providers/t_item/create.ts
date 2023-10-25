import { T_items } from '@prisma/client';
import { prisma } from '../../prisma/client';

export const createTransactionItem = async (
  tra: Omit<T_items, 't_item_created' | 't_item_updatedAt'>
): Promise<void | Error> => {
  try {
    await prisma.t_items.create({
      data: {
        ...tra,
      },
    });

    return;
  } catch (error) {
    console.error(error);
    return new Error('Error creating transaction');
  }
};
