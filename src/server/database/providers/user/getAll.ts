import { User } from '@prisma/client';
import { prisma } from '../../prisma/client';

interface GetAllUsersOptions {
  page: number;
  limit: number;
  filter: string;
  userId?: number;
}

export const getAllUsers = async ({
  page,
  limit,
  filter,
  userId = 0,
}: GetAllUsersOptions): Promise<User[] | Error> => {
  try {
    const users = await prisma.user.findMany({
      where: {
        user_id: userId || undefined,
        user_name: { contains: filter },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        user_id: 'asc',
      },
    });
    return users;
  } catch (error) {
    console.error('Error getting users:', error);
    throw new Error('Failed to fetch users');
  }
};
