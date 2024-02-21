import { v4 } from 'uuid';

export const generateFilename = (userId: string) => {
  const id = v4();
  return `${userId}-${id}`;
};
