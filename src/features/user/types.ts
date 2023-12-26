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

// type IResume = {
//   _id: string;
//   owner: ISeeker;
//   position: string;
//   category: string;
//   skills: string[];
//   workExperience: number;
//   salaryExpectations: number;
//   country: string;
//   city: string;
//   relocation: boolean;
//   englishLevel: string;
//   summary: string;
//   employmentOptions: string;
// };

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
  resume: IResume;
}

interface IEmployer extends IAccount {
  userPosition: string;
  company: {
    name: string;
    hiresCount: number;
    webSite: string;
    douPage: string;
    logo: string;
    employeesCount: number;
    summary: string;
  };
}

type UserDataType = ISeeker | IEmployer | null;

type EditSeekerData = {
  id: string;
  searchStatus: boolean;
  firstName: string;
  lastName: string;
  avatar: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  skype: string;
  telegram: string;
};

type EditEmployerData = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  phone: string;
  linkedin: string;
  userPosition: string;
  companyName: string;
  companyWebSite: string;
  companyDouPage: string;
  companyLogo: string;
  companyEmployeesCount: number;
  companyDescription: string;
};

interface IResume {
  _id: string;
  owner: string;
  position: string;
  category: string;
  skills: string[];
  workExperience: number;
  salaryExpectations: number;
  country: string;
  city: string;
  relocation: boolean;
  englishLevel: string;
  summary: string;
  employmentOptions: string;
}

type EditResumeType = {
  id: string;
  position: string;
  category: string;
  // skills: string[];
  workExperience: number;
  salaryExpectations: number;
  country: string;
  city: string;
  relocation: boolean;
  englishLevel: string;
  summary: string;
  employmentOptions: string;
};

type AddVacancyType = {
  title: string;
  category: string;
  domain: string;
  workExperience: number;
  experienceLevel: string;
  salaryFrom: number;
  country: string;
  city: string;
  englishLevel: string;
  summary: string;
  companyType: string;
  employmentOptions: string;
};

interface IVacancy {
  _id: string;
  author: string;
  title: string;
  category: string;
  domain: string;
  workExperience: number;
  experienceLevel: string;
  salaryFrom: number;
  country: string;
  city: string;
  englishLevel: string;
  summary: string;
  companyType: string;
  employmentOptions: string;
}

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
  IResume,
  EditResumeType,
  AddVacancyType,
  IVacancy,
};
