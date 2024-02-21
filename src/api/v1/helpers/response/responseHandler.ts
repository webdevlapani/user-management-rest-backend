import { ResponseCode, StatusCode } from 'api/v1/interfaces';
import { Response } from 'express';

export const responseHandler = (res: Response, body: any) => {
  let statusCode: number;

  const { BAD_REQUEST, RECORD_NOT_FOUND, SERVER_ERROR, SUCCESS, UNAUTHORIZED, VALIDATION_ERROR, CONFLICT, FAILED_DEPENDENCY, FORBIDDEN } = StatusCode;

  switch (body.status) {
    case SUCCESS:
      statusCode = body.statusCode || ResponseCode.SUCCESS;
      break;
    case SERVER_ERROR:
      statusCode = body.statusCode || ResponseCode.INTERNAL_SERVER_ERROR;
      break;
    case BAD_REQUEST:
      statusCode = body.statusCode || ResponseCode.BAD_REQUEST;
      break;
    case RECORD_NOT_FOUND:
      statusCode = body.statusCode || ResponseCode.NOT_FOUND;
      break;
    case VALIDATION_ERROR:
      statusCode = body.statusCode || ResponseCode.VALIDATION_ERROR;
      break;
    case UNAUTHORIZED:
      statusCode = body.statusCode || ResponseCode.UNAUTHORIZED;
      break;
    case CONFLICT:
      statusCode = body.statusCode || ResponseCode.CONFLICT;
      break;
    case FAILED_DEPENDENCY:
      statusCode = body.statusCode || ResponseCode.FAILED_DEPENDENCY;
      break;
    case FORBIDDEN:
      statusCode = body.statusCode || ResponseCode.FORBIDDEN;
      break;
    default:
      statusCode = ResponseCode.INTERNAL_SERVER_ERROR;
      break;
  }

  return res.status(statusCode).send(body);
};
