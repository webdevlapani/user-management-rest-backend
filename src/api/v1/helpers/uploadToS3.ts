import { FileType } from 'api/v1/interfaces';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { s3 } from 'config';

import { generateFilename } from './generateFilename';

type UploadToS3Params = { file: any; fileType: FileType; bucketName: string; userId: string };

type UploadToS3Response = Promise<{ filename: string | null; error: string | null }>;

export const uploadToS3 = async ({ file, fileType, bucketName, userId }: UploadToS3Params): UploadToS3Response => {
  const { mimetype, data: fileData } = file.file;

  if (mimetype.split('/')[0] !== fileType) {
    return {
      filename: null,
      error: `File must be of type ${fileType}`,
    };
  }
  const filename = `${generateFilename(userId)}.webp`;

  const params: PutObjectRequest = {
    Bucket: bucketName,
    Key: filename,
    Body: fileData,
  };

  const data = await s3.upload(params).promise();

  if (data && data.Key) {
    return { filename, error: null };
  } else {
    return { filename: null, error: 'File upload failed' };
  }
};
