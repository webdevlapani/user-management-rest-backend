import { Model, Types } from 'mongoose';

export const checkUnique = async (
  model: Model<any, {}, {}, {}>,
  value: { [key: string]: string | number | boolean | Types.ObjectId | RegExp | object },
) => {
  const data = await model.findOne(value);

  if (data) return false;
  return true;
};
