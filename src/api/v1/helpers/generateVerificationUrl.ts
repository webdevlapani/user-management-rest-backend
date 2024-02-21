import { redis, userVerificationPrefix } from 'config';

import { generateToken } from './generateToken';

export const generateVerificationUrl = async (userId: string) => {
  const token = generateToken({ userId });

  await redis.set(userVerificationPrefix + token, userId, 'EX', 60 * 60 * 24); // 1 Day

  return `${process.env.CLIENT_BASE_URL}/user/confirm/${token}`;
};
