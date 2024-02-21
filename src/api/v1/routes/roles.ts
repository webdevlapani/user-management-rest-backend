import { RoleController } from 'api/v1/controllers';
import { ModuleType, PermissionType } from 'api/v1/interfaces';
import { authorize, permissionCheck, validate } from 'api/v1/middleware';
import { roleValidationRule } from 'api/v1/validations';
import express from 'express';

const rolesRoutes = express.Router();

rolesRoutes.post(
  '/create',
  authorize,
  permissionCheck(ModuleType.ROLES, PermissionType.CREATE),
  validate(roleValidationRule.createRoleSchema),
  RoleController.createRole,
);
rolesRoutes.patch(
  '/delete',
  authorize,
  permissionCheck(ModuleType.ROLES, PermissionType.DELETE),
  validate(roleValidationRule.deleteRoleSchema),
  RoleController.deleteRole,
);
rolesRoutes.patch(
  '/update',
  authorize,
  permissionCheck(ModuleType.ROLES, PermissionType.UPDATE),
  validate(roleValidationRule.updateRoleSchema),
  RoleController.updateRole,
);
rolesRoutes.get('/:roleId', authorize, RoleController.roleDetails);
rolesRoutes.get('/', authorize, permissionCheck(ModuleType.ROLES, PermissionType.READ), RoleController.getRoles);

export default rolesRoutes;
