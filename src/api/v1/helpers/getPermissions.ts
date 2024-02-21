import { ModuleType, PermissionType } from 'api/v1/interfaces';
import { UserModel } from 'api/v1/models';
import { Types } from 'mongoose';

interface Props {
  userId: string;
  moduleType: ModuleType;
  permissionType: PermissionType;
}

export const getPermissions = async ({ userId, moduleType, permissionType }: Props) => {
  const permissions = await UserModel.aggregate([
    { $match: { _id: new Types.ObjectId(userId) } },
    {
      $lookup: {
        from: 'roles',
        localField: 'roles',
        foreignField: '_id',
        as: 'roles',
      },
    },
    { $unwind: '$roles' },
    { $replaceRoot: { newRoot: '$roles' } },
    { $unwind: '$permissions' },
    { $replaceRoot: { newRoot: '$permissions' } },
    { $match: { $and: [{ moduleType }, { $expr: { $in: [permissionType, '$permissionType'] } }] } },
  ]);

  if (permissions.length) return true;
  return false;
};
