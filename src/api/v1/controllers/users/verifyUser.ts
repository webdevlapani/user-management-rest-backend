import { response, responseHandler } from 'api/v1/helpers';
import { VerifyUserData } from 'api/v1/interfaces';
import { UserModel } from 'api/v1/models';
import { UserServices } from 'api/v1/services';
import { redis, userVerificationPrefix } from 'config';
import { Request, Response } from 'express';

export const verifyUser = async ({ body: { token } }: Request<{}, {}, VerifyUserData>, res: Response) => {
  try {
    const userId = await redis.get(userVerificationPrefix + token);

    if (!userId) {
      return responseHandler(res, response.recordNotFound({ message: 'User not found' }));
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return responseHandler(res, response.recordNotFound({ message: 'User not found' }));
    }

    if (user && user.isVerified) {
      return responseHandler(res, response.conflict({ message: 'User is already verified' }));
    }

    await UserServices.verifyUser(userId);

    return responseHandler(res, response.success({ message: 'User verified successfully', data: { success: true } }));
  } catch (err) {
    return responseHandler(res, response.failedDependency({ message: err.message }));
  }
};
