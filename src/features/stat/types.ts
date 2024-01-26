interface ILevelStat {
  level: string;
  Vacancies: number;
  Candidates: number;
}

interface IEmploymentStat {
  employment: string;
  Vacancies: number;
  Candidates: number;
}

interface IDomainStat {
  domain: string;
  Adult: number;
  Gambling: number;
  Dating: number;
  GameDev: number;
  Blockchain: number;
}

export { ILevelStat, IEmploymentStat, IDomainStat };
