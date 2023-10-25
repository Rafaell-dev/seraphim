import { Service } from '@prisma/client';
import { prisma } from '../../prisma/client';

export const getAllServices = async (
  page: number,
  limit: number,
  filter: string,
  ser_id = 0
): Promise<Service[] | Error> => {
  try {
    const result = await prisma.service.findMany({
      where: {
        ser_id: ser_id || undefined,
        ser_name: { contains: filter },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        ser_name: 'asc',
      },
    });
    return result;
  } catch (error) {
    console.error('Error getting services:', error);
    throw new Error('Error getting services');
  }
};
