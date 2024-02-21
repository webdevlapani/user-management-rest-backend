import { S3 } from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

export const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  signatureVersion: 'v4',
  region: process.env.AWS_REGION,
});
