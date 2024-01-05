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
  createdAt: string;
  updatedAt: string;
}

interface ISeekerAccount extends IAccount {
  searchStatus: boolean;
  skype: string;
  telegram: string;
  github: string;
  portfolio: string;
  resume: string | IResume;
  applications: IJob[];
}

interface IEmployerAccount extends IAccount {
  userPosition: string;
  companyName: string;
  companyHiresCount: number;
  companyWebSite: string;
  companyDouPage: string;
  companyLogo: string;
  companyEmployeesCount: number;
  companyDescription: string;
}

interface IResume {
  _id: string;
  owner: string;
  position: string;
  category: string;
  skills: string[];
  workExperience: number;
  experienceLevel: string;
  salaryExpectations: number;
  country: string;
  city: string;
  relocation: boolean;
  englishLevel: string;
  summary: string;
  employment: string[];
  dontConsider: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}
interface ICompany {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  avatar: string;
  phone: string;
  linkedin: string;
  createdAt: string;
  userPosition: string;
  companyName: string;
  companyHiresCount: number;
  companyWebSite: string;
  companyDouPage: string;
  companyLogo: string;
  companyEmployeesCount: number;
  companyDescription: string;
}

interface IApplication {
  _id: string;
  firstName: string;
  lastName: string;
}

interface IJob {
  _id: string;
  author: string | ICompany;
  title: string;
  category: string;
  domain: string;
  skills: string[];
  workExperience: number;
  experienceLevel: string;
  salaryRange: string;
  country: string;
  city: string;
  englishLevel: string;
  summary: string;
  companyType: string;
  employment: string[];
  viewsCount: number;
  applications: string[];
  isArchive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IVacancy {
  _id: string;
  author: string | ICompany;
  title: string;
  category: string;
  domain: string;
  skills: string[];
  workExperience: number;
  experienceLevel: string;
  salaryRange: string;
  country: string;
  city: string;
  englishLevel: string;
  summary: string;
  companyType: string;
  employment: string[];
  viewsCount: number;
  applications: IApplication[];
  isArchive: boolean;
  createdAt: string;
  updatedAt: string;
}

export {
  IAccount,
  ISeekerAccount,
  IEmployerAccount,
  IResume,
  ICompany,
  IJob,
  IVacancy,
  IApplication,
};
