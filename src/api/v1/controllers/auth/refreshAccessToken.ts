import { response, responseHandler } from 'api/v1/helpers';
import { RefreshAccessTokenData } from 'api/v1/interfaces';
import { UserModel } from 'api/v1/models';
import { AuthServices } from 'api/v1/services';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const refreshAccessToken = async ({ body: { userId, refreshToken } }: Request<{}, {}, RefreshAccessTokenData>, res: Response) => {
  try {
    const user = await UserModel.findById(userId);

    if (!jwt.decode(refreshToken) || !user || !user.isVerified) {
      return responseHandler(res, response.unAuthorized({ message: 'Invalid/Expired Token.' }));
    }

    const accessToken = await AuthServices.refreshAccessToken(new Types.ObjectId(userId), refreshToken);

    return responseHandler(res, response.success({ message: 'Access token refreshed successfully.', data: accessToken }));
  } catch (err) {
    return responseHandler(res, response.failedDependency({ message: err.message }));
  }
};
