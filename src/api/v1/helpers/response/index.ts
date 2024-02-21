import { ResponseData, StatusCode } from 'api/v1/interfaces';

export const response = {
  success: (data: ResponseData) => ({
    status: StatusCode.SUCCESS,
    message: data.message || 'Your request is successfully executed',
    data: data.data || {},
  }),

  internalServerError: (data: ResponseData) => ({
    status: StatusCode.SERVER_ERROR,
    message: data.message || 'Internal server error.',
    data: data.data || {},
  }),

  badRequest: (data: ResponseData) => ({
    status: StatusCode.BAD_REQUEST,
    message: data.message || 'The request cannot be fulfilled due to bad syntax.',
    data: data.data || {},
  }),

  failedDependency: (data: ResponseData) => ({
    status: StatusCode.FAILED_DEPENDENCY,
    message:
      data.message ||
      'The method could not be performed on the resource because the requested action depended on another action and that action failed.',
    data: data.data || {},
  }),

  recordNotFound: (data: ResponseData) => ({
    status: StatusCode.RECORD_NOT_FOUND,
    message: data.message || 'Record(s) not found with specified criteria.',
    data: data.data || {},
  }),

  validationError: (data: ResponseData) => ({
    status: StatusCode.VALIDATION_ERROR,
    message: data.message || `Invalid Data, Validation Failed.`,
    data: data.data || {},
  }),

  unAuthorized: (data: ResponseData) => ({
    status: StatusCode.UNAUTHORIZED,
    message: data.message || 'You are not authorized to access the request.',
    data: data.data || {},
  }),

  conflict: (data: ResponseData) => ({
    status: StatusCode.CONFLICT,
    message: data.message || 'The request could not be completed due to a conflict with the current state of the target resource.',
    data: data.data || {},
  }),

  forbidden: (data: ResponseData) => ({
    status: StatusCode.FORBIDDEN,
    message: data.message || 'Access to the requested resource is forbidden.',
    data: data.data || {},
  }),
};

export * from './responseHandler';
