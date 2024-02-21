import { GetRolesData } from 'api/v1/interfaces';
import { RoleModel } from 'api/v1/models';
import { Types } from 'mongoose';

export const getRoles = async (data: GetRolesData) => {
  try {
    const { limit = 10, skip = 0, createdBy, moduleType, name, field, sort } = data;

    const conditions = [];

    if (name) {
      conditions.push({
        $match: {
          name: {
            $regex: `.*${name}.*`,
            $options: 'i',
          },
        },
      });
    }

    if (moduleType) {
      conditions.push({
        $match: {
          'permissions.moduleType': moduleType,
        },
      });
    }

    if (createdBy) {
      conditions.push({
        $match: { createdBy: new Types.ObjectId(createdBy) },
      });
    }

    return await RoleModel.aggregate([
      ...conditions,
      { $match: { isDelete: false } },
      {
        $facet: {
          roles: [
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
            { $sort: { [field ?? 'createdAt']: sort === 'asc' ? 1 : -1 } },
            { $skip: Number(skip) ?? 0 },
            { $limit: Number(limit) ?? 10 },
          ],
          totalRoles: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ]);
  } catch (err) {
    throw Error('Failed to fetch roles');
  }
};
