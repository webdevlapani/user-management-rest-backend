import { response, responseHandler } from 'api/v1/helpers';
import { RoleDetailsData } from 'api/v1/interfaces';
import { RoleModel } from 'api/v1/models';
import { RoleServices } from 'api/v1/services';
import { Request, Response } from 'express';

export const roleDetails = async (req: Request<RoleDetailsData, {}, {}>, res: Response) => {
  try {
    const { roleId } = req.params;

    if (!roleId) {
      return responseHandler(res, response.badRequest({ message: 'Role Id is required' }));
    }

    const role = await RoleModel.findById(roleId);

    if (!role) {
      return responseHandler(res, response.recordNotFound({ message: 'Role not found' }));
    }

    const data = await RoleServices.getRole(roleId);

    return responseHandler(res, response.success({ message: !data ? 'No role found' : 'Role fetched successfully', data }));
  } catch (err) {
    return responseHandler(res, response.failedDependency({ message: err.message }));
  }
};
