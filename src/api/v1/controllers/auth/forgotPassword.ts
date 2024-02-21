import { forgotPasswordUrl, response, responseHandler, sendEmail } from 'api/v1/helpers';
import { ForgotPasswordData } from 'api/v1/interfaces';
import { UserModel } from 'api/v1/models';
import { Request, Response } from 'express';

export const forgotPassword = async ({ body: { email } }: Request<any, any, ForgotPasswordData>, res: Response) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return responseHandler(res, response.recordNotFound({ message: 'User not found' }));
    }

    const url = await forgotPasswordUrl(user._id.toString());

    await sendEmail({
      to: email,
      subject: 'Reset Password',
      text: `Click on the link to reset your account. ${url}`,
    });

    return responseHandler(res, response.success({ message: 'Reset password link sent successfully.', data: { success: true } }));
  } catch (err) {
    return responseHandler(res, response.failedDependency({ message: err.message }));
  }
};
