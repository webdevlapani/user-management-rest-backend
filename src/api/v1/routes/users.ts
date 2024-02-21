import { UserController } from 'api/v1/controllers';
import { ModuleType, PermissionType } from 'api/v1/interfaces';
import { authorize, permissionCheck, validate } from 'api/v1/middleware';
import { userValidationRule } from 'api/v1/validations';
import express from 'express';

const usersRoutes = express.Router();

usersRoutes.post(
  '/create',
  authorize,
  permissionCheck(ModuleType.USERS, PermissionType.CREATE),
  validate(userValidationRule.createUserSchema),
  UserController.createUser,
);
usersRoutes.patch('/verify', validate(userValidationRule.verifyUserSchema), UserController.verifyUser);
usersRoutes.patch('/upload-profile-pic', authorize, UserController.uploadProfilePic);
usersRoutes.patch(
  '/toggle-user-status',
  authorize,
  permissionCheck(ModuleType.USERS, PermissionType.UPDATE),
  validate(userValidationRule.toggleUserStatusSchema),
  UserController.toggleUserStatus,
);
usersRoutes.get('/:userId', authorize, UserController.userDetails);
usersRoutes.get('/', authorize, permissionCheck(ModuleType.USERS, PermissionType.READ), UserController.getUsers);

export default usersRoutes;
