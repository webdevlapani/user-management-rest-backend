import { forgotPasswordPrefix, redis } from 'config';

import { generateToken } from './generateToken';

export const forgotPasswordUrl = async (userId: string) => {
  const token = generateToken({ userId });
  await redis.set(forgotPasswordPrefix + token, userId, 'EX', 60 * 60 * 24); // 1 Day

  return `${process.env.CLIENT_BASE_URL}/user/forgot-password/${token}`;
};
