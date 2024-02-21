import { checkUnique, response, responseHandler } from 'api/v1/helpers';
import { RoleData, UpdateRoleData } from 'api/v1/interfaces';
import { RoleModel } from 'api/v1/models';
import { RoleServices } from 'api/v1/services';
import { Request, Response } from 'express';

export const updateRole = async (req: Request<{}, {}, UpdateRoleData>, res: Response) => {
  try {
    const { roleId, name, permissions } = req.body;

    const role = await RoleModel.findById(roleId);

    const roleData: RoleData = {};

    if (!role) {
      return responseHandler(res, response.recordNotFound({ message: 'Role not found' }));
    }

    const isNameUnique = await checkUnique(RoleModel, { name: { $regex: `.*${name}.*`, $options: 'i' } });

    if (!isNameUnique) {
      return responseHandler(res, response.conflict({ message: 'Role with given name already exists' }));
    }

    if (name) {
      roleData.name = name;
    }

    if (permissions?.length) {
      roleData.permissions = permissions;
    }
    await RoleServices.updateRole(roleId, roleData);

    return responseHandler(res, response.success({ message: 'Role updated successfully', data: { success: true } }));
  } catch (err) {
    return responseHandler(res, response.failedDependency({ message: err.message }));
  }
};
