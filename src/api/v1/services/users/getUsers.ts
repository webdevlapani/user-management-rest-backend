import { GetUsersData } from 'api/v1/interfaces';
import { UserModel } from 'api/v1/models/users';

export const getUsers = async (data: GetUsersData) => {
  try {
    const { limit = 10, skip = 0, email, firstName, isActive, isVerified, lastName, field, sort } = data;

    const conditions = [];

    if (firstName) {
      conditions.push({
        $match: {
          firstName: {
            $regex: `.*${firstName}.*`,
            $options: 'i',
          },
        },
      });
    }

    if (lastName) {
      conditions.push({
        $match: {
          lastName: {
            $regex: `.*${lastName}.*`,
            $options: 'i',
          },
        },
      });
    }

    if (email) {
      conditions.push({
        $match: {
          email: {
            $regex: `.*${email}.*`,
            $options: 'i',
          },
        },
      });
    }

    if (isActive !== undefined) {
      conditions.push({
        $match: {
          isActive: isActive === 'true',
        },
      });
    }

    if (isVerified !== undefined) {
      conditions.push({
        $match: {
          isVerified: isVerified === 'true',
        },
      });
    }

    return await UserModel.aggregate([
      ...conditions,
      {
        $facet: {
          users: [
            {
              $lookup: {
                from: 'roles',
                localField: 'roles',
                foreignField: '_id',
                as: 'roles',
              },
            },
            { $sort: { [field ?? 'createdAt']: sort === 'asc' ? 1 : -1 } },
            { $skip: Number(skip) ?? 0 },
            { $limit: Number(limit) ?? 10 },
          ],
          totalUsers: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ]);
  } catch (err) {
    throw Error('Failed to fetch users');
  }
};
