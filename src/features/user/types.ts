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
  token: string;
};

type ForgotPasswordDataType = {
  email: string;
};

export type {
  RegisterDataType,
  LoginDataType,
  VerifyEmailDataType,
  ForgotPasswordDataType,
};
