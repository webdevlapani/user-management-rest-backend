import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(+process.env.SALT!);
  return await bcrypt.hash(password, salt);
};
