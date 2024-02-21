import { ReadStream } from 'fs';

export type ResponseData = {
  message?: string;
  data?: { [key: string]: any } | boolean | string;
};

export interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadStream;
}
