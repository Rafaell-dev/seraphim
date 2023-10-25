import { User } from '@prisma/client';
import { prisma } from '../../prisma/client';

async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await prisma.user.findUnique({
      where: {
        user_email: email,
      },
    });

    return result || null; // return null if no user found
  } catch (error) {
    console.error('Error getting user by email:', error);
    throw new Error('Failed to fetch user by email');
  }
}

export default getUserByEmail;
