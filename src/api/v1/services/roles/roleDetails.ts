import { RoleModel } from 'api/v1/models';
import { Types } from 'mongoose';

export const getRole = async (roleId: string) => {
  try {
    const roles = await RoleModel.aggregate([
      {
        $match: {
          $and: [{ _id: new Types.ObjectId(roleId) }, { isDelete: false }],
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'createdBy',
        },
      },
      { $unwind: '$createdBy' },
      {
        $lookup: {
          from: 'roles',
          localField: 'createdBy.roles',
          foreignField: '_id',
          as: 'createdBy.roles',
        },
      },
    ]);

    if (roles.length) {
      return roles[0];
    }
    return undefined;
  } catch (err) {
    throw Error('Failed to fetch role');
  }
};
