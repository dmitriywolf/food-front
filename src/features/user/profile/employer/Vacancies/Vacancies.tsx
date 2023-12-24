import React, { useEffect } from 'react';
import {
  Box,
  Card,
  TextInput,
  Stack,
  Button,
  Checkbox,
  Flex,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
// import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import JobCard from './VacancyCard';

import {
  selectIsLoading,
  selectUser,
  selectVacancies,
} from '../../../userSlice';
import { getVacancies } from '../../../service';

export default function EmployerVacancies() {
  const dispatch = useAppDispatch();

  const profile = useAppSelector(selectUser);
  const vacancies = useAppSelector(selectVacancies);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    if (profile?._id) {
      dispatch(getVacancies(profile._id));
    }
  }, [dispatch, profile]);

  console.log('vacancies', vacancies);

  return (
    <Flex>
      {vacancies.map(
        ({
          _id,
          title,
          category,
          domain,
          workExperience,
          experienceLevel,
          salaryFrom,
          country,
          city,
          englishLevel,
          summary,
          companyType,
          employmentOptions,
        }) => (
          <JobCard
            author='djd'
            key={_id}
            _id={_id}
            title={title}
            category={category}
            domain={domain}
            workExperience={workExperience}
            experienceLevel={experienceLevel}
            salaryFrom={salaryFrom}
            country={country}
            city={city}
            englishLevel={englishLevel}
            summary={summary}
            companyType={companyType}
            employmentOptions={employmentOptions}
          />
        ),
      )}
    </Flex>
  );
}
