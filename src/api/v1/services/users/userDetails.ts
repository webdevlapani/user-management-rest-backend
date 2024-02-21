import { generatePresignedUrl } from 'api/v1/helpers';
import { UserModel } from 'api/v1/models';
import { S3_BUCKET_NAME } from 'config';

export const userDetails = async ({ userId, loggedInUserId }: { userId?: string; loggedInUserId: string }) => {
  try {
    const user: any = await UserModel.findById(userId ?? loggedInUserId).populate('roles');

    if (user && user.profilePic) {
      const presignedUrl = generatePresignedUrl({ bucketName: S3_BUCKET_NAME, key: user.profilePic });

      const userData = { ...user._doc, profilePic: presignedUrl };

      return userData;
    }
  } catch (err) {
    throw Error('Failed to fetch user');
  }
};
