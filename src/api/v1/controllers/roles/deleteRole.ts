import { response, responseHandler } from 'api/v1/helpers';
import { DeleteRoleData } from 'api/v1/interfaces';
import { RoleModel } from 'api/v1/models';
import { RoleServices } from 'api/v1/services';
import { Request, Response } from 'express';

export const deleteRole = async (req: Request<{}, {}, DeleteRoleData>, res: Response) => {
  try {
    const { roleId } = req.body;

    const role = await RoleModel.findById(roleId);

    if (!role) {
      return responseHandler(res, response.recordNotFound({ message: 'Role not found' }));
    }

    await RoleServices.deleteRole(roleId);

    return responseHandler(res, response.success({ message: 'Role deleted successfully', data: { success: true } }));
  } catch (err) {
    return responseHandler(res, response.failedDependency({ message: err.message }));
  }
};
