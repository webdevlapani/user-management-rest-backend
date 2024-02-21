import { response, responseHandler } from 'api/v1/helpers';
import { UserDetailsData } from 'api/v1/interfaces';
import { UserServices } from 'api/v1/services';
import { Request, Response } from 'express';

export const userDetails = async (req: Request<UserDetailsData, {}, {}>, res: Response) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return responseHandler(res, response.badRequest({ message: 'User Id is required' }));
    }

    const loggedInUserId = (req as any).user._id;

    const data = await UserServices.userDetails({ userId, loggedInUserId });

    return responseHandler(res, response.success({ message: !data ? 'No user found' : 'User fetched successfully', data }));
  } catch (err) {
    return responseHandler(res, response.failedDependency({ message: err.message }));
  }
};
