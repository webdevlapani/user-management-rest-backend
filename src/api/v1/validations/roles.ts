import { ModuleType, PermissionType } from 'config';
import Joi from 'joi';

export const roleValidationRule = {
  createRoleSchema: Joi.object({
    name: Joi.string().required(),
    permissions: Joi.array()
      .items({
        moduleType: Joi.valid(...Object.values(ModuleType)).required(),
        permissionType: Joi.array()
          .items(Joi.number().valid(...Object.values(PermissionType)))
          .min(1)
          .required(),
      })
      .min(1)
      .required(),
  }),
  deleteRoleSchema: Joi.object({
    roleId: Joi.string().hex().length(24).required(),
  }),
  updateRoleSchema: Joi.object({
    roleId: Joi.string().hex().length(24).required(),
    name: Joi.string(),
    permissions: Joi.array()
      .items({
        moduleType: Joi.valid(...Object.values(ModuleType)).required(),
        permissionType: Joi.array()
          .items(Joi.number().valid(...Object.values(PermissionType)))
          .min(1)
          .required(),
      })
      .min(1),
  }).or('name', 'permissions'),
};
