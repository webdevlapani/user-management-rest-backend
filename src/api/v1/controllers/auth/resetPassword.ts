import { comparePasswords, hashPassword, response, responseHandler } from 'api/v1/helpers';
import { ResetPasswordData } from 'api/v1/interfaces';
import { UserModel } from 'api/v1/models';
import { AuthServices } from 'api/v1/services';
import { forgotPasswordPrefix, redis } from 'config';
import { Request, Response } from 'express';

export const resetPassword = async ({ body: { confirmPassword, password, token } }: Request<any, any, ResetPasswordData>, res: Response) => {
  try {
    const userId = await redis.get(forgotPasswordPrefix + token);

    if (!userId) {
      return responseHandler(res, response.unAuthorized({ message: 'Invalid/Expired token' }));
    }

    if (password !== confirmPassword) {
      return responseHandler(res, response.validationError({ message: 'Confirm password must be same as password' }));
    }

    const user = await UserModel.findById(userId).select('+password');

    if (!user) {
      return responseHandler(
        res,
        response.recordNotFound({
          message: 'User not found',
        }),
      );
    }

    const isEqual = await comparePasswords(password, user.password);

    if (isEqual) {
      return responseHandler(
        res,
        response.validationError({
          message: 'New password cannot be same as old password',
        }),
      );
    }

    const hashedPassword = await hashPassword(password);

    await AuthServices.resetPassword(userId, hashedPassword);

    return responseHandler(res, response.success({ message: 'Password reset successfully.', data: { success: true } }));
  } catch (err) {
    return responseHandler(res, response.failedDependency({ message: err.message }));
  }
};
