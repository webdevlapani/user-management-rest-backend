import { s3, SIGNED_URL_EXPIRATION_TIME } from 'config';

type Params = {
  bucketName: string;
  key: string;
};

export const generatePresignedUrl = ({ bucketName, key }: Params) => {
  return s3.getSignedUrl('getObject', {
    Bucket: bucketName,
    Key: key,
    Expires: SIGNED_URL_EXPIRATION_TIME,
  });
};
