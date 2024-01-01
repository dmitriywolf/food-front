import { useEffect } from 'react';
import { Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { ROUTES } from 'shared/routes';
import VacancyCard from './VacancyCard';
import {
  selectVacancies,
  setCurrentVacancy,
} from '../../employerVacanciesSlice';
import { getVacancies } from '../../services';

export default function EmployerVacancies() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const vacancies = useAppSelector(selectVacancies);

  const setVacancyHandler = (id: string) => () => {
    dispatch(setCurrentVacancy(id));
    navigate(ROUTES.profileAddEditVacancy);
  };

  useEffect(() => {
    dispatch(getVacancies());
  }, [dispatch]);

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
