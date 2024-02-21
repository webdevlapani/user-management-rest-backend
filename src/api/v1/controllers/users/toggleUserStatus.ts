import { response, responseHandler } from 'api/v1/helpers';
import { ToggleUserStatusData } from 'api/v1/interfaces';
import { UserModel } from 'api/v1/models';
import { UserServices } from 'api/v1/services';
import { Request, Response } from 'express';

export const toggleUserStatus = async ({ body: { userId } }: Request<{}, {}, ToggleUserStatusData>, res: Response) => {
  try {
    const user = await UserModel.findById(userId);

    if (!user || !user.isVerified) {
      return responseHandler(res, response.recordNotFound({ message: 'User not found' }));
    }

    await UserServices.toggleUserStatus(userId, user.isActive);

    return responseHandler(
      res,
      response.success({ message: `User ${user.isActive ? 'deactivated' : 'activated'} successfully`, data: { isActive: !user.isActive } }),
    );
  } catch (err) {
    return responseHandler(res, response.failedDependency({ message: err.message }));
  }
};
