import { comparePasswords, generateVerificationUrl, response, responseHandler, sendEmail } from 'api/v1/helpers';
import { LoginData } from 'api/v1/interfaces';
import { UserModel } from 'api/v1/models';
import { AuthServices } from 'api/v1/services';
import { Request, Response } from 'express';

export const login = async ({ body: { email, password } }: Request<{}, {}, LoginData>, res: Response) => {
  try {
    const user = await UserModel.findOne({ email }).select('+password');

    if (!user) {
      return responseHandler(res, response.recordNotFound({ message: 'Invalid credentials' }));
    }

    if (!user.isVerified) {
      const url = await generateVerificationUrl(String(user._id));

      await sendEmail({
        to: email,
        subject: 'Account Verification',
        text: `Click on the link to verify your account. ${url}`,
      });

      return responseHandler(
        res,
        response.validationError({ message: 'Please verify your account. Check your email for account verification link.' }),
      );
    }

    const isEqual = await comparePasswords(password, user.password);

    if (!isEqual) {
      return responseHandler(res, response.recordNotFound({ message: 'Invalid credentials.' }));
    }

    const tokens = await AuthServices.login(user._id);

    return responseHandler(res, response.success({ message: 'User logged in successfully.', data: tokens }));
  } catch (err) {
    return responseHandler(res, response.failedDependency({ message: err.message }));
  }
};
