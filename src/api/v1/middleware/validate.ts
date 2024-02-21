import { response, responseHandler } from 'api/v1/helpers';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validate = (validator: Joi.ObjectSchema<any>) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      const validated = await validator.validateAsync(req.body, {
        errors: {
          wrap: {
            label: false,
          },
        },
      });

      req.body = validated;
      next();
    } catch (err) {
      //* Pass err to next
      //! If validation error occurs call next with HTTP 400. Otherwise HTTP 500
      if (err.isJoi) return next(responseHandler(res, response.badRequest({ message: err.message })));
      next(responseHandler(res, response.internalServerError({})));
    }
  };
};
