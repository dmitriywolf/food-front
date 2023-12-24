import { IEmployer } from 'features/user/types';

type IJob = {
  _id: string;
  author: IEmployer;
  title: string;
  category: string;
  domain: string;
  workExperience: number;
  experienceLevel: string;
  salaryFrom: 0;
  country: string;
  city: string;
  englishLevel: string;
  summary: string;
  companyType: string;
  employmentOptions: string;
  applicationsCount: number;
  applications: string[];
};

export { IJob };
