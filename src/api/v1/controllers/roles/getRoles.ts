import { response, responseHandler } from 'api/v1/helpers';
import { GetRolesData } from 'api/v1/interfaces';
import { RoleServices } from 'api/v1/services';
import { Request, Response } from 'express';

export const getRoles = async (req: Request<{}, {}, {}, GetRolesData>, res: Response) => {
  try {
    const result = await RoleServices.getRoles(req.query);

    if (result?.length) {
      return responseHandler(
        res,
        response.success({
          message: 'Roles fetched successfully',
          data: {
            totalRoles: result[0].totalRoles[0]?.count ?? 0,
            roles: result[0].roles,
          },
        }),
      );
    }
    return responseHandler(
      res,
      response.success({
        message: 'No roles found',
        data: { totalRoles: result[0].totalRoles[0]?.count ?? 0, roles: [] },
      }),
    );
  } catch (err) {
    return responseHandler(res, response.failedDependency({ message: err.message }));
  }
};
