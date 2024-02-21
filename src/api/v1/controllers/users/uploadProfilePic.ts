import { response, responseHandler, uploadToS3 } from 'api/v1/helpers';
import { FileType } from 'api/v1/interfaces';
import { UserServices } from 'api/v1/services';
import { S3_BUCKET_NAME } from 'config';
import { Request, Response } from 'express';

export const uploadProfilePic = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;

    if (!req.files) {
      return responseHandler(res, response.badRequest({ message: 'File not found' }));
    }

    const file = req.files;

    const { filename, error } = await uploadToS3({ file, fileType: FileType.image, bucketName: S3_BUCKET_NAME, userId });

    if (filename && !error) {
      await UserServices.uploadProfilePic(userId, filename);

      return responseHandler(res, response.success({ message: 'User profile uploaded successfully', data: { success: true } }));
    }

    return responseHandler(res, response.validationError({ message: error as string }));
  } catch (err) {
    return responseHandler(res, response.failedDependency({ message: err.message }));
  }
};
