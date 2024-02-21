import { UserModel } from 'api/v1/models';

export const uploadProfilePic = async (userId: string, filename: string) => {
  try {
    return await UserModel.findByIdAndUpdate(userId, {
      $set: {
        profilePic: filename,
      },
    });
  } catch (err) {
    throw Error('Failed to upload profile pic');
  }
};
