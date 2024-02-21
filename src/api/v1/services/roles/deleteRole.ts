import { RoleModel } from 'api/v1/models';

export const deleteRole = async (roleId: string) => {
  try {
    return await RoleModel.findByIdAndUpdate(roleId, { $set: { isDelete: true } });
  } catch (err) {
    throw Error('Failed to delete role');
  }
};
