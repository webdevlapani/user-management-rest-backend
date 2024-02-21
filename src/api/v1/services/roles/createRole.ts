import { CreateRoleData } from 'api/v1/interfaces';
import { RoleModel } from 'api/v1/models';

type Data = CreateRoleData & { createdBy: string };

export const createRole = async (data: Data) => {
  try {
    return await RoleModel.create(data);
  } catch (err) {
    throw Error('Failed to create role');
  }
};
