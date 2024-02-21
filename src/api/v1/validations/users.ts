import Joi from 'joi';

export const userValidationRule = {
  createUserSchema: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  verifyUserSchema: Joi.object({
    token: Joi.string().regex(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/),
  }),
  toggleUserStatusSchema: Joi.object({
    userId: Joi.string().hex().length(24).required(),
  }),
};
