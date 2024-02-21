import { checkUnique, response, responseHandler } from 'api/v1/helpers';
import { CreateRoleData } from 'api/v1/interfaces';
import { RoleModel } from 'api/v1/models';
import { RoleServices } from 'api/v1/services';
import { Request, Response } from 'express';

export const createRole = async (req: Request<{}, {}, CreateRoleData>, res: Response) => {
  try {
    const data = req.body;

    const isNameUnique = await checkUnique(RoleModel, { name: { $regex: `.*${data.name}.*`, $options: 'i' } });

    if (!isNameUnique) {
      return responseHandler(res, response.conflict({ message: 'Role with given name already exists' }));
    }

    await RoleServices.createRole({ ...data, createdBy: (req as any).user._id });

    return responseHandler(res, response.success({ message: 'Role created successfully', data: { success: true } }));
  } catch (err) {
    return responseHandler(res, response.failedDependency({ message: err.message }));
  }
};
