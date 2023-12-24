import { Box, Card, TextInput, Stack, Button } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { notifications } from '@mantine/notifications';
import { selectIsLoading } from '../../../userSlice';
import { addVacancy } from '../../../service';

import type { VacancyFormValues } from './types';

import type { IEmployer } from '../../../types';

export default function AddEditVacancy() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  // const profile = useAppSelector(selectUser) as IEmployer;
  const isLoading = useAppSelector(selectIsLoading);

  const form = useForm<VacancyFormValues>({
    initialValues: {
      title: '',
      category: '',
      domain: '',
      workExperience: 0,
      experienceLevel: '',
      salaryFrom: 0,
      country: '',
      city: '',
      englishLevel: '',
      summary: '',
      companyType: '',
      employmentOptions: '',
    },
    // validate: zodResolver(employerProfileSchema),
  });

  const onSubmit = async (values: VacancyFormValues) => {
    try {
      await dispatch(addVacancy(values)).unwrap();

      notifications.show({
        color: 'green',
        title: 'Add vacancy',
        message: 'Vacancy added',
      });
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        title: 'Add vacncy',
        message: error as string,
      });
    }
  };

  return (
    <Box component='section'>
      <Card shadow='sm' padding='md' radius='md' withBorder>
        <Box component='form' w='100%' onSubmit={form.onSubmit(onSubmit)}>
          <Stack gap={12}>
            <TextInput label='Vacancy Title' {...form.getInputProps('title')} />
            <TextInput label='Category' {...form.getInputProps('category')} />
            <TextInput label='Domain' {...form.getInputProps('domain')} />
            <TextInput
              label='Work Experience'
              {...form.getInputProps('workExperience')}
            />
            <TextInput
              label='Experience Level'
              {...form.getInputProps('experienceLevel')}
            />
            <TextInput
              label='Salary From'
              {...form.getInputProps('salaryFrom')}
            />
            {/* Company */}
            <TextInput label='Country' {...form.getInputProps('country')} />
            <TextInput label='City' {...form.getInputProps('city')} />
            <TextInput
              label='English Level'
              {...form.getInputProps('englishLevel')}
            />
            <TextInput label='summary' {...form.getInputProps('summary')} />

            <TextInput
              label='Company Type'
              {...form.getInputProps('companyType')}
            />
            <TextInput
              label='Employment Options'
              {...form.getInputProps('employmentOptions')}
            />
            <Button type='submit' disabled={isLoading}>
              Save changes
            </Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}
