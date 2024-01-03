export const DEBUG = process.env.DEBUG === 'true';
export const API_URL = `${process.env.API_URL}/api`;

export const TOKEN_LOCALSTORAGE_KEY = 'token';

export const ROLES = {
  seeker: 'Seeker',
  employer: 'Employer',
  admin: 'Admin',
};

export const ENGLISH_LEVELS = [
  {
    id: 'no',
    value: 'No English',
  },
  {
    id: 'a1',
    value: 'Beginner/Elementary',
  },
  {
    id: 'a2',
    value: 'Pre-Intermediate',
  },
  {
    id: 'b1',
    value: 'Intermediate',
  },
  {
    id: 'b2',
    value: 'Upper-Intermediate',
  },
  {
    id: 'c1',
    value: 'Advanced/Fluent',
  },
];

export const CATEGORIES = [
  { value: 'Not Selected', label: 'Not Selected' },
  {
    group: 'DEVELOPMENT',
    items: [
      'JavaScript/Front-End',
      'Fullstack',
      'React Native',
      'Java',
      'C#/.NET',
      'Python',
      'PHP',
      'Node.js',
      'iOS',
      'Android',
      'C/C++/Embedded',
      'Flutter',
      'Goland',
      'Ruby',
      'Scala',
      'Salesforce',
      'Rust',
    ],
  },
  {
    group: 'MORE DEVELOPMENT',
    items: [
      'QA Manual',
      'QA Automation',
      'Design/UI/UX',
      '2D/3D Artist/Illustrator',
      'Project Manager',
      'Product Manager',
      'Architect/CTO',
      'DevOps',
      'Business Analyst',
      'Data Science',
      'Data Analyst',
      'Sysadmin',
      'Gamedev/Unity',
      'SQL/DBA',
      'Security',
      'Data Engineer',
      'Scrum Master/Agile Coach',
    ],
  },
  {
    group: 'NON-TECHNICAL',
    items: [
      'Marketing',
      'HR',
      'Recruiter',
      'Customer/Technical Support',
      'Sales',
      'SEO',
      'Technical Writting',
      'Lead Generation',
      'Head/Chief',
      'Other',
    ],
  },
];
