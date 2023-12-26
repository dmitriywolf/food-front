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
  resume: string;
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
  skills: string;
  workExperience: number;
  salaryExpectations: number;
  country: string;
  city: string;
  relocation: boolean;
  englishLevel: string;
  summary: string;
  employmentOptions: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

export { IAccount, ISeekerAccount, IEmployerAccount, IResume };
