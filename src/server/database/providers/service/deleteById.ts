import { prisma } from '../../prisma/client';

export const deleteServiceById = async (
  ser_id: number
): Promise<void | Error> => {
  try {
    const serviceId = Number(ser_id);
    const result = await prisma.service.delete({
      where: {
        ser_id: serviceId,
      },
    });

    if (result) {
      return;
    } else {
      throw new Error('Service not found');
    }
  } catch (error) {
    console.error('Error deleting service:', error);
    throw new Error('Error deleting service');
  }
};
