import { User } from '@prisma/client';
import { prisma } from '../../prisma/client';

export const getUserById = async (userId: number): Promise<User | null> => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
    });
    return result || null;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting user');
  }
};
