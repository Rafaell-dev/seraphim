import * as createUserController from './create';
import * as getAllUsersController from './getAll';
import * as getUserByIdController from './getById';
import * as deleteUserByIdController from './deleteById';
import * as updateUserByIdController from './updateById';

export const usersController = {
  ...createUserController,
  ...getAllUsersController,
  ...getUserByIdController,
  ...updateUserByIdController,
  ...deleteUserByIdController,
};
