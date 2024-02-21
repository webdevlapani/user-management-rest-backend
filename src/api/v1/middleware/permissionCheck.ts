import { getPermissions, response, responseHandler } from 'api/v1/helpers';
import { ModuleType, PermissionType } from 'api/v1/interfaces';
import { NextFunction, Request, Response } from 'express';

export const permissionCheck = (moduleType: ModuleType, permissionType: PermissionType) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user._id;

      const hasPermission = await getPermissions({ userId, moduleType, permissionType });

      if (!hasPermission) {
        return next(responseHandler(res, response.forbidden({ message: 'Permission denied' })));
      }

      next();
    } catch (err) {
      return next(responseHandler(res, response.badRequest({ message: err.message })));
    }
  };
};
