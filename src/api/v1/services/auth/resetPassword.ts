import { UserModel } from 'api/v1/models';

export const resetPassword = async (userId: string, password: string) => {
  try {
    return await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          password,
        },
      },
      { runValidators: true, new: true },
    );
  } catch (err) {
    throw Error('Failed to create user');
  }
};
