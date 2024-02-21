export type Context = {
  loggedInUserId?: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RefreshAccessTokenData = {
  userId: string;
  refreshToken: string;
};

export type ChangePasswordData = {
  password: string;
  confirmPassword: string;
  currentPassword: string;
};

export type ForgotPasswordData = {
  email: string;
};

export type ResetPasswordData = {
  token: string;
  confirmPassword: string;
  password: string;
};
