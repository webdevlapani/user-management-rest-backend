import { generateToken } from 'api/v1/helpers';
import { Types } from 'mongoose';

export const login = async (id: Types.ObjectId) => {
  try {
    const accessToken = generateToken({ userId: id });
    const refreshToken = generateToken({ userId: id, isRefreshToken: true }, true);

    return {
      accessToken,
      refreshToken,
    };
  } catch (err) {
    throw Error('Failed to login');
  }
};
