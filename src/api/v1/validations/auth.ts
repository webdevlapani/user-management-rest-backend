import { JWT_TOKEN_REGEX } from 'config';
import Joi from 'joi';

export const authValidationRule = {
  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),
  refreshAccessTokenSchema: Joi.object({
    userId: Joi.string().hex().length(24).required(),
    refreshToken: Joi.string().regex(JWT_TOKEN_REGEX).required(),
  }),
  changePasswordSchema: Joi.object({
    currentPassword: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required(),
  }),
  forgotPasswordSchema: Joi.object({
    email: Joi.string().email().required(),
  }),
  resetPasswordSchema: Joi.object({
    token: Joi.string().regex(JWT_TOKEN_REGEX).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().min(6).required(),
  }),
};
