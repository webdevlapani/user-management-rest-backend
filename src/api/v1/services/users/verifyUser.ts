import { UserModel } from 'api/v1/models';

export const verifyUser = async (userId: string) => {
  try {
    return await UserModel.findByIdAndUpdate(userId, {
      $set: {
        isVerified: true,
      },
    });
  } catch (err) {
    throw Error('User verification failed');
  }
};
