import { prisma } from '../../prisma/client';
import HashPassword from '@services/HashPassword';

interface CreateUserInput {
  user_name: string;
  user_email: string;
  user_password: string;
  user_group_id: number;
}

export const createUser = async (
  userInput: CreateUserInput
): Promise<null | Error> => {
  try {
    const hashedPassword = await HashPassword(userInput.user_password);

    await prisma.user.create({
      data: {
        user_name: userInput.user_name,
        user_email: userInput.user_email,
        user_password: hashedPassword,
        user_group_id: userInput.user_group_id,
      },
    });

    return null;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
};
