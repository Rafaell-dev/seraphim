import * as createUser from './create';
import * as deleteUserById from './deleteById';
import * as getAllUsers from './getAll';
import * as getUserById from './getById';
import * as updateUserById from './updateById';
import * as getUserByEmail from './getByEmail';

export const usersProvider = {
  ...createUser,
  ...getAllUsers,
  ...getUserById,
  ...updateUserById,
  ...deleteUserById,
  ...getUserByEmail,
};
