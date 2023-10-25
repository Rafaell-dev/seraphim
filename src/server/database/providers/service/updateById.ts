import { Service } from '@prisma/client';
import { prisma } from '../../prisma/client';

export const updateServiceById = async (
  updatedService: Service
): Promise<void | Error> => {
  try {
    const serviceId = Number(updatedService.ser_id);
    const existingService = await prisma.service.findUnique({
      where: { ser_id: updatedService.ser_id },
    });

    if (!existingService) {
      throw new Error('Service not found');
    }

    await prisma.service.update({
      where: { ser_id: serviceId },
      data: updatedService,
    });

    return;
  } catch (error) {
    console.error('Error updating service:', error);
    throw new Error('Error updating service');
  }
};
