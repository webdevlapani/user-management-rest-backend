import { Schema } from 'mongoose';

import { FileUpload } from './common';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: Schema.Types.ObjectId[];
  isVerified: boolean;
  profilePic: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type VerifyUserData = {
  token: string;
};

export type UploadProfilePicData = {
  file: FileUpload;
};

export type ToggleUserStatusData = {
  userId: string;
};

export type UserDetailsData = {
  userId: string;
};

export type GetUsersData = {
  skip?: string;
  limit?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isActive?: string;
  isVerified?: string;
  sort?: string;
  field?: string;
};
