type ICompany = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  avatar: string;
  phone: string;
  linkedin: string;
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
};

export { ICompany };
