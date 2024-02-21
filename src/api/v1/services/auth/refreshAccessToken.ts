import { generateToken } from 'api/v1/helpers';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Types } from 'mongoose';

export const refreshAccessToken = async (userId: Types.ObjectId, token: string) => {
  try {
    const decodedToken = verify(token, process.env.SECRET_KEY!);

    if (!userId.equals((decodedToken as JwtPayload).userId && (decodedToken as JwtPayload).isRefreshToken)) {
      throw Error('Refresh token verification failed');
    }

    const accessToken = generateToken({ userId });

    return {
      accessToken,
    };
  } catch (err) {
    throw Error('Failed to generate access token');
  }
};
