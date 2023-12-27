import { Stack } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import VacancyCard from './VacancyCard';
import {
  selectVacancies,
  setCurrentVacancy,
} from '../../employerVacanciesSlice';

type VacanciesProps = {
  setVacancyTab: () => void;
};

export default function EmployerVacancies({ setVacancyTab }: VacanciesProps) {
  const dispatch = useAppDispatch();

  const vacancies = useAppSelector(selectVacancies);

  const setVacancyHandler = (id: string) => () => {
    dispatch(setCurrentVacancy(id));
    setVacancyTab();
  };

  return (
    <Stack gap={12}>
      {vacancies.map((vacancy) => (
        <VacancyCard
          key={vacancy._id}
          vacancy={vacancy}
          onEdit={setVacancyHandler(vacancy._id)}
        />
      ))}
    </Stack>
  );
}
