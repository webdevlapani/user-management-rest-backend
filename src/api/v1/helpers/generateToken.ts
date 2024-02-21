import jwt from 'jsonwebtoken';

export const generateToken = (payload: { [key: string]: unknown }, isRefreshToken?: boolean) => {
  return jwt.sign(payload, process.env.SECRET_KEY!, {
    expiresIn: isRefreshToken ? '7d' : '2h',
  });
};
