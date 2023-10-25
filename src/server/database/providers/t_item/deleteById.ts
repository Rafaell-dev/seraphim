import { prisma } from '../../prisma/client';

export const deleteTransactionItemById = async (
  t_item_id: number
): Promise<void | Error> => {
  try {
    const tItem = Number(t_item_id);
    await prisma.t_items.delete({
      where: {
        t_item_id: tItem,
      },
    });

    return;
  } catch (error) {
    console.error('Error deleting transaction item:', error);
    throw new Error('Error deleting transaction item');
  }
};
