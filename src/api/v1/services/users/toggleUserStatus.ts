import { UserModel } from 'api/v1/models';

export const toggleUserStatus = async (userId: string, isActive: boolean) => {
  try {
    return await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          isActive: !isActive,
        },
      },
      { new: true, runValidators: true },
    );
  } catch (err) {
    throw Error('User verification failed');
  }
};
