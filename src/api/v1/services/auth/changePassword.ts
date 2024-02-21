import { UserModel } from 'api/v1/models/users';
import { Types } from 'mongoose';

export const changePassword = async (userId: Types.ObjectId, password: string) => {
  try {
    return await UserModel.findByIdAndUpdate(
      userId,
      {
        $set: { password },
      },
      { runValidators: true, new: true },
    );
  } catch (err) {
    throw Error('Failed to create user');
  }
};
