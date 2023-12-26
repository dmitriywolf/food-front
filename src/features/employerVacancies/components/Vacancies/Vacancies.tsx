import { Stack } from '@mantine/core';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import VacancyCard from './VacancyCard';
import { selectVacancies } from '../../employerVacanciesSlice';

export default function EmployerVacancies() {
  const dispatch = useAppDispatch();

  const vacancies = useAppSelector(selectVacancies);

  return (
    <Stack gap={12}>
      {vacancies.map((vacancy) => (
        <VacancyCard key={vacancy._id} vacancy={vacancy} />
      ))}
    </Stack>
  );
}
