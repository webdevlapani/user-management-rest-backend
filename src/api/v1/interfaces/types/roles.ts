import { ModuleType, PermissionType } from 'api/v1/interfaces';
import { Schema } from 'mongoose';

export type Permission = {
  moduleType: ModuleType;
  permissionType: PermissionType[];
};

export type Role = {
  name: string;
  isDelete: boolean;
  createdBy: Schema.Types.ObjectId;
  permissions: Permission[];
  createdAt: Date;
  updatedAt: Date;
};

export type CreateRoleData = {
  name: string;
  permissions: Permission[];
};

export type DeleteRoleData = {
  roleId: string;
};

export type UpdateRoleData = {
  roleId: string;
  name?: string;
  permissions?: Permission[];
};

export type RoleData = {
  name?: string;
  permissions?: Permission[];
};

export type RoleDetailsData = {
  roleId: string;
};

export type GetRolesData = {
  skip?: string;
  limit?: string;
  name?: String;
  moduleType?: ModuleType;
  createdBy?: string;
  sort?: string;
  field?: string;
};
