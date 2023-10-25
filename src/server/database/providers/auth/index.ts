import { prisma } from '../../prisma/client';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const authProvider = async (
  credentials: Omit<
    User,
    | 'user_id'
    | 'user_createdAt'
    | 'user_updatedAt'
    | 'user_name'
    | 'user_group_id'
  >
): Promise<String | Error> => {
  try {
    const { user_email, user_password } = credentials;

    const user = await prisma.user.findUnique({
      where: { user_email },
    });

    if (!user) {
      return new Error('User not find');
    }

    const isMatch = await bcrypt.compare(user_password, user.user_password);

    if (!isMatch) {
      return new Error('invalid credentials');
    }

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    return token;
  } catch (err) {
    console.error(err);
    return new Error('Internal server error');
  }
};
