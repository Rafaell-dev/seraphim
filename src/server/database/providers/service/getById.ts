import { Service } from '@prisma/client';
import { prisma } from '../../prisma/client';

export const getServiceById = async (
  serviceId: number
): Promise<Service | void> => {
  try {
    const result = await prisma.service.findUnique({
      where: {
        ser_id: serviceId,
      },
    });
    return result || undefined;
  } catch (error) {
    console.error('Error getting service by ID:', error);
    throw new Error('Error getting service');
  }
};
