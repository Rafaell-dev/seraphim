import { prisma } from '../../prisma/client';

export const deleteUserById = async (userId: number): Promise<void | Error> => {
  try {
    const userConvert = Number(userId);
    const result = await prisma.user.delete({
      where: {
        user_id: userConvert,
      },
    });

    if (!result) {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};
