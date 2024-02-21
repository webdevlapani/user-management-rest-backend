import { AuthController } from 'api/v1/controllers';
import { authorize, validate } from 'api/v1/middleware';
import { authValidationRule } from 'api/v1/validations';
import express from 'express';

const authRoutes = express.Router();

authRoutes.post('/login', validate(authValidationRule.loginSchema), AuthController.login);
authRoutes.post('/refresh', validate(authValidationRule.refreshAccessTokenSchema), AuthController.refreshAccessToken);
authRoutes.patch('/change-password', authorize, validate(authValidationRule.changePasswordSchema), AuthController.changePassword);
authRoutes.post('/forgot-password', validate(authValidationRule.forgotPasswordSchema), AuthController.forgotPassword);
authRoutes.patch('/reset-password', validate(authValidationRule.resetPasswordSchema), AuthController.resetPassword);

export default authRoutes;
