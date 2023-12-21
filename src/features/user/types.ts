type RegisterDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
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

interface IAccount {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  avatar: string;
  phone: string;
  linkedin: string;
  role: string;
}

interface ISeeker extends IAccount {
  searchStatus: boolean;
  skype: string;
  telegram: string;
  github: string;
  portfolio: string;
  resume: string;
}

interface IEmployer extends IAccount {
  userPosition: string;
  company: {
    name: string;
    hiresCount: number;
    webSite: string;
    douPage: string;
    logo: string;
    eployeesCount: number;
  };
}

type UserDataType = ISeeker | IEmployer | null;

type EditSeekerData = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  skype: string;
  telegram: string;
};

type EditEmployerData = {
  id: string;
  userPosition: string;
  firstName: string;
  lastName: string;
  phone: string;
  linkedin: string;
};

export type {
  RegisterDataType,
  LoginDataType,
  VerifyEmailDataType,
  ForgotPasswordDataType,
  ResetPasswordDataType,
  ISeeker,
  IEmployer,
  UserDataType,
  EditSeekerData,
  EditEmployerData,
};
