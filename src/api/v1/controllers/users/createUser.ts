import { checkUnique, generateVerificationUrl, hashPassword, response, responseHandler, sendEmail } from 'api/v1/helpers';
import { CreateUserData } from 'api/v1/interfaces';
import { UserModel } from 'api/v1/models';
import { UserServices } from 'api/v1/services';
import { Request, Response } from 'express';

export const createUser = async (req: Request<{}, {}, CreateUserData>, res: Response) => {
  try {
    const data = req.body;

    const isUserUnique = await checkUnique(UserModel, { email: data.email });

    if (!isUserUnique) {
      return responseHandler(res, response.conflict({ message: 'User with given email already exists' }));
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await UserServices.createUser({ ...data, password: hashedPassword });

    const url = await generateVerificationUrl(user._id.toString());

    await sendEmail({
      to: user.email,
      subject: 'Account Verification',
      text: `Click on the link to verify your account. ${url}`,
    });

    return responseHandler(res, response.success({ message: 'User created successfully', data: { success: true } }));
  } catch (err) {
    return responseHandler(res, response.failedDependency({ message: err.message }));
  }
};
