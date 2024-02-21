export enum FileType {
  image = 'image',
  video = 'video',
}

// Change constant when changing enum
export enum PermissionType {
  READ = 1,
  CREATE = 2,
  DELETE = 3,
  UPDATE = 4,
}

// Change constant when changing enum
export enum ModuleType {
  USERS = 1,
  ROLES = 2,
}

export enum StatusCode {
  SUCCESS = 'SUCCESS',
  SERVER_ERROR = 'SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  RECORD_NOT_FOUND = 'RECORD_NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  CONFLICT = 'CONFLICT',
  FAILED_DEPENDENCY = 'FAILED_DEPENDENCY',
  FORBIDDEN = 'FORBIDDEN',
}

export enum ResponseCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  VALIDATION_ERROR = 422,
  CONFLICT = 409,
  FAILED_DEPENDENCY = 424,
  FORBIDDEN = 403,
}
