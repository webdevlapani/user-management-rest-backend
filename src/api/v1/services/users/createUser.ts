import { CreateUserData } from 'api/v1/interfaces';
import { UserModel } from 'api/v1/models';

export const createUser = async (data: CreateUserData) => {
  try {
    return await UserModel.create(data);
  } catch (err) {
    throw Error('Failed to create user');
  }
};
