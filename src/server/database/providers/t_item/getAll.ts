import { T_items } from '@prisma/client';
import { prisma } from '../../prisma/client';

export const getAllTransactionItems = async (
  page: number,
  limit: number,
  filter: number,
  t_item_tra_id = 0
): Promise<T_items[] | Error> => {
  try {
    const result = await prisma.t_items.findMany({
      where: {
        t_item_tra_id: t_item_tra_id || undefined,
        t_item_ser_id: { equals: filter },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        t_item_id: 'asc',
      },
    });
    return result;
  } catch (error) {
    console.error('Error getting transaction items:', error);
    throw new Error('Error getting transaction items');
  }
};
