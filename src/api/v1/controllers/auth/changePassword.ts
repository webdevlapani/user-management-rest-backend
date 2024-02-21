import { comparePasswords, hashPassword, response, responseHandler } from 'api/v1/helpers';
import { ChangePasswordData } from 'api/v1/interfaces';
import { UserModel } from 'api/v1/models';
import { AuthServices } from 'api/v1/services';
import { Request, Response } from 'express';

export const changePassword = async (req: Request<any, any, ChangePasswordData>, res: Response) => {
  try {
    const { confirmPassword, currentPassword, password } = req.body;
    const user = await UserModel.findById((req as any).user._id).select('+password');

    if (currentPassword === password) {
      return responseHandler(res, response.conflict({ message: 'New password cannot be same as old password' }));
    }

    if (!user || !user.isVerified) {
      return responseHandler(res, response.recordNotFound({ message: 'Invalid credentials' }));
    }
    const isEqual = await comparePasswords(currentPassword, user.password);

    if (!isEqual) {
      return responseHandler(res, response.recordNotFound({ message: 'Invalid credentials' }));
    }

    if (password !== confirmPassword) {
      return responseHandler(
        res,
        response.validationError({
          message: 'Confirm password must be same as password',
        }),
      );
    }

    const hashedPassword = await hashPassword(password);

    await AuthServices.changePassword(user._id, hashedPassword);

    return responseHandler(res, response.success({ message: 'Password changed successfully.', data: { success: true } }));
  } catch (err) {
    return responseHandler(res, response.failedDependency({ message: err.message }));
  }
};
