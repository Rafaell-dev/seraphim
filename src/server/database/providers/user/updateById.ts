import { prisma } from '../../prisma/client';
import { User } from '@prisma/client';
import HashPassword from '@services/HashPassword';

export const updateUserById = async (
  userData: Omit<User, 'user_createdAt' | 'user_updatedAt'>
): Promise<void | Error> => {
  try {
    const userId = userData.user_id;

    // Verifique se a senha foi fornecida e a hash se necessário
    if (userData.user_password) {
      const hashedPassword = await HashPassword(userData.user_password);
      userData.user_password = hashedPassword;
    }

    // Atualize o usuário no banco de dados
    await prisma.user.update({
      where: { user_id: userId },
      data: userData,
    });

    return;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating user');
  }
};
