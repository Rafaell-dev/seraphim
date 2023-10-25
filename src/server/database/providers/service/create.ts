import { Service } from '@prisma/client';
import { prisma } from '../../prisma/client';

export const createService = async (
  serviceData: Omit<Service, 'ser_id' | 'ser_createdAt' | 'ser_updatedAt'>
): Promise<String | Error> => {
  try {
    const result = await prisma.service.create({
      data: {
        ...serviceData,
      },
    });

    return result.ser_name;
  } catch (error) {
    console.error('Error creating service:', error);
    throw new Error('Error creating service');
  }
};
