import { generatePresignedUrl, response, responseHandler } from 'api/v1/helpers';
import { GetUsersData, User } from 'api/v1/interfaces';
import { UserServices } from 'api/v1/services';
import { S3_BUCKET_NAME } from 'config';
import { Request, Response } from 'express';

export const getUsers = async (req: Request<{}, {}, {}, GetUsersData>, res: Response) => {
  try {
    const result = await UserServices.getUsers(req.query);

    if (result?.[0]?.users?.length) {
      const userList = result[0].users.map((user: User) => ({
        ...user,
        profilePic: generatePresignedUrl({ bucketName: S3_BUCKET_NAME, key: user.profilePic! }),
      }));

      return responseHandler(
        res,
        response.success({
          message: 'Users fetched successfully',
          data: {
            totalUsers: result[0].totalUsers[0]?.count ?? 0,
            users: userList,
          },
        }),
      );
    }
    return responseHandler(
      res,
      response.success({
        message: 'No users found',
        data: { totalUsers: result[0].totalUsers[0]?.count ?? 0, users: [] },
      }),
    );
  } catch (err) {
    return responseHandler(res, response.failedDependency({ message: err.message }));
  }
};
