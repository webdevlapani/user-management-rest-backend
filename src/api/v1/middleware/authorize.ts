import { response, responseHandler } from 'api/v1/helpers';
import { UserModel } from 'api/v1/models';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export const authorize = async (req: Request<any, any, any>, res: Response, next: NextFunction) => {
  let token = '';

  if (req.headers.authorization) {
    // This is done in order to make it work with swagger
    token = req.headers.authorization.split('Bearer ')[1] || req.headers.authorization;
  }

  if (!token) {
    return next(responseHandler(res, response.unAuthorized({ message: 'User not authorized' })));
  }

  try {
    return verify(token, process.env.SECRET_KEY!, async (error, decoded) => {
      if (error) {
        return next(responseHandler(res, response.unAuthorized({ message: 'Invalid/Expired Token.' })));
      }
      const user = await UserModel.findById((decoded as JwtPayload).userId);

      if (user && user._id) {
        (req as any).user = user;
        return next();
      }
    });
  } catch (err) {
    throw err.message;
  }
};
