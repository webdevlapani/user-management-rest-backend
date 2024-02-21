import { RoleData } from 'api/v1/interfaces';
import { RoleModel } from 'api/v1/models';

export const updateRole = async (roleId: string, roleData: RoleData) => {
  try {
    return await RoleModel.findByIdAndUpdate(roleId, { $set: roleData }, { new: true, runValidators: true });
  } catch (err) {
    throw Error('Failed to update role');
  }
};
