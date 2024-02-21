import { ModuleType, Permission, PermissionType, Role } from 'api/v1/interfaces';
import { model, Schema } from 'mongoose';

const PermissionSchema = new Schema<Permission>(
  {
    moduleType: { type: Number, enum: ModuleType, required: true },
    permissionType: { type: [Number], enum: PermissionType, required: true },
  },
  { _id: false },
);

const schema = new Schema<Role>(
  {
    name: { type: String, required: true, unique: true },
    isDelete: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    permissions: {
      type: [PermissionSchema],
      required: true,
    },
  },
  { timestamps: true },
);

export const RoleModel = model<Role>('Role', schema);
