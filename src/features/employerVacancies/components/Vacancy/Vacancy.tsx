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
import { selectIsLoading } from '../../employerVacanciesSlice';
import { createVacancy } from '../../services';
import { vacancySchema } from './schema';

import type { VacancyFormValues } from './types';

export default function Vacancy() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const { onSubmit, getInputProps, reset } = useForm<VacancyFormValues>({
    initialValues: {
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
    },
    validate: zodResolver(vacancySchema),
  });

  const submitHandler = async (values: VacancyFormValues) => {
    try {
      await dispatch(createVacancy(values)).unwrap();
      reset();
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
  };

  return (
    <Box component='section'>
      <Card shadow='sm' padding='md' radius='md' withBorder>
        <Box component='form' w='100%' onSubmit={onSubmit(submitHandler)}>
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
              Create vacancy
            </Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}
