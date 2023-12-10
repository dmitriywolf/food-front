type RegisterDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type LoginDataType = {
  email: string;
  password: string;
};

type VerifyEmailDataType = {
  code: string;
};

type ForgotPasswordDataType = {
  email: string;
};

type ResetPasswordDataType = {
  code: string;
  password: string;
};

type UserDataType = {
  firstName: string;
  lastName: string;
  email: string;
};

export type {
  RegisterDataType,
  LoginDataType,
  VerifyEmailDataType,
  ForgotPasswordDataType,
  ResetPasswordDataType,
  UserDataType,
};
