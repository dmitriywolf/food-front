import { ENGLISH_LEVELS } from 'shared/constants';

export const getEnglishLevel = (ID: string) => {
  return ENGLISH_LEVELS.find(({ id }) => id === ID)?.value;
};
