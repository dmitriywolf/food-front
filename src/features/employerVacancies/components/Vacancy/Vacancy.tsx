import {
  Box,
  Card,
  TextInput,
  Stack,
  Button,
  NumberInput,
  Textarea,
} from '@mantine/core';
import {
  IconMapPinFilled,
  IconMapPin,
  IconLanguage,
} from '@tabler/icons-react';
import { useForm, zodResolver } from '@mantine/form';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { notifications } from '@mantine/notifications';
import {
  selectIsLoading,
  selectCurrentVacancy,
} from '../../employerVacanciesSlice';
import { createVacancy, updateVacancy } from '../../services';
import { vacancySchema } from './schema';

import type { VacancyFormValues } from './types';

const INITIAL_VALUES = {
  title: '',
  category: '',
  domain: '',
  skills: '',
  workExperience: 0,
  experienceLevel: '',
  salaryRange: '',
  country: '',
  city: '',
  englishLevel: '',
  summary: '',
  companyType: '',
  employmentOptions: '',
};

export default function Vacancy() {
  const dispatch = useAppDispatch();

  const vacancy = useAppSelector(selectCurrentVacancy);
  const isLoading = useAppSelector(selectIsLoading);

  const { onSubmit, getInputProps, setValues } = useForm<VacancyFormValues>({
    initialValues: vacancy._id
      ? {
          title: vacancy.title,
          category: vacancy.category,
          domain: vacancy.domain,
          skills: vacancy.skills,
          workExperience: vacancy.workExperience,
          experienceLevel: vacancy.experienceLevel,
          salaryRange: vacancy.salaryRange,
          country: vacancy.country,
          city: vacancy.city,
          englishLevel: vacancy.englishLevel,
          summary: vacancy.summary,
          companyType: vacancy.companyType,
          employmentOptions: vacancy.employmentOptions,
        }
      : INITIAL_VALUES,
    validate: zodResolver(vacancySchema),
  });

  const submitHandler = async (values: VacancyFormValues) => {
    if (vacancy._id) {
      const updateData = { _id: vacancy._id, ...values };
      try {
        await dispatch(updateVacancy(updateData)).unwrap();
        setValues(INITIAL_VALUES);
        notifications.show({
          color: 'green',
          title: 'Update vacancy',
          message: 'Vacancy updated',
        });
      } catch (error: unknown) {
        notifications.show({
          color: 'red',
          title: 'Update vacncy',
          message: error as string,
        });
      }
    } else {
      try {
        await dispatch(createVacancy(values)).unwrap();
        setValues(INITIAL_VALUES);
        notifications.show({
          color: 'green',
          title: 'Create vacancy',
          message: 'Vacancy created',
        });
      } catch (error: unknown) {
        notifications.show({
          color: 'red',
          title: 'Create vacncy',
          message: error as string,
        });
      }
    }
  };

  return (
    <Box component='section'>
      <Card shadow='sm' padding='md' radius='md' withBorder>
        <Box component='form' onSubmit={onSubmit(submitHandler)}>
          <Stack gap={12}>
            <TextInput label='Vacancy title' {...getInputProps('title')} />

            <TextInput
              label='Category (Frontend/Backend/Devops..)'
              {...getInputProps('category')}
            />

            <TextInput
              label='Domain (Web/Blockchain/Mobile...)'
              {...getInputProps('domain')}
            />

            <TextInput
              label='Tech skills (Python, JS, Figma...)'
              {...getInputProps('skills')}
            />

            <NumberInput
              label='Work experience (years)'
              suffix=' years'
              hideControls
              {...getInputProps('workExperience')}
            />

            <TextInput
              label='Experience level (Trainee/Junior/Middle/Senior)'
              {...getInputProps('experienceLevel')}
            />

            <TextInput
              label='Salary range (1000 - 2000 $)'
              {...getInputProps('salaryRange')}
            />

            <TextInput
              label='Country'
              leftSection={<IconMapPinFilled size={16} />}
              {...getInputProps('country')}
            />

            <TextInput
              label='City'
              leftSection={<IconMapPin size={16} />}
              {...getInputProps('city')}
            />

            <TextInput
              label='English level (A2/B1/B2/C1/C2)'
              leftSection={<IconLanguage size={16} />}
              {...getInputProps('englishLevel')}
            />

            <Textarea label='Summary' {...getInputProps('summary')} />

            <TextInput
              label='Company type (Product/Outsource/Outstaff)'
              {...getInputProps('companyType')}
            />

            <TextInput
              label='Employment options (Office/Remote/Part-time)'
              {...getInputProps('employmentOptions')}
            />
            <Button type='submit' disabled={isLoading}>
              {vacancy._id ? 'Update vacancy' : 'Create vacancy'}
            </Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}
