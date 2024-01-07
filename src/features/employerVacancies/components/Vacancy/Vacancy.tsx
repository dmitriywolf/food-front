import {
  Box,
  Card,
  TextInput,
  Stack,
  Button,
  Textarea,
  Select,
  Text,
  Slider,
  Radio,
  Flex,
  MultiSelect,
  Checkbox,
  Group,
} from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import { useForm, zodResolver } from '@mantine/form';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { notifications } from '@mantine/notifications';
import {
  CATEGORIES,
  EXPERIENCE_YEARS,
  ENGLISH_LEVELS,
  EXPERIENCE_LEVELS,
  COMPANY_TYPES,
  EMPLOYMENT,
  DEV_DOMAINS,
  COUNTRIES,
  SKILLS,
} from 'shared/constants';
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
  skills: [],
  workExperience: 0,
  experienceLevel: '',
  salaryRange: '',
  country: '',
  city: '',
  englishLevel: '',
  summary: '',
  companyType: '',
  employment: [],
  isArchive: false,
};

export default function Vacancy() {
  const dispatch = useAppDispatch();

  const vacancy = useAppSelector(selectCurrentVacancy);
  const isLoading = useAppSelector(selectIsLoading);

  const { onSubmit, getInputProps, setValues, values, setFieldValue } =
    useForm<VacancyFormValues>({
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
            employment: vacancy.employment,
            isArchive: vacancy.isArchive,
          }
        : INITIAL_VALUES,
      validate: zodResolver(vacancySchema),
    });

  const submitHandler = async (data: VacancyFormValues) => {
    if (vacancy._id) {
      const updateData = { _id: vacancy._id, ...data };
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
          <Stack gap={20}>
            <TextInput
              label='Position'
              placeholder='Job position'
              {...getInputProps('title')}
            />

            <Select
              label='Domain'
              placeholder='Select domain'
              value={values.domain}
              data={DEV_DOMAINS}
              onChange={(value) => setFieldValue('domain', value!)}
            />

            <Select
              label='Category'
              placeholder='Select category'
              value={values.category}
              data={CATEGORIES}
              onChange={(value) => setFieldValue('category', value!)}
            />

            <Radio.Group
              name='Company type'
              value={values.companyType}
              label='Company type'
              onChange={(value) => setFieldValue('companyType', value)}
            >
              <Flex gap={12} pt={8} pl={20}>
                {COMPANY_TYPES.map((t) => (
                  <Radio key={t} value={t} label={t} />
                ))}
              </Flex>
            </Radio.Group>

            <Stack gap={4} pb={12}>
              <Text size='sm' fw='bold' pb={8}>
                Work experience (years)
              </Text>
              <Slider
                defaultValue={0}
                min={0}
                max={10}
                label={(value) => `${value} years`}
                step={0.5}
                value={values.workExperience}
                marks={EXPERIENCE_YEARS}
                onChangeEnd={(value) => setFieldValue('workExperience', value)}
              />
            </Stack>

            <TextInput
              label='Salary range, $'
              placeholder='1000 - 2000 $'
              {...getInputProps('salaryRange')}
            />

            <MultiSelect
              label='Skills'
              placeholder='Select skill'
              value={values.skills}
              data={SKILLS}
              searchable
              clearable
              hidePickedOptions
              onChange={(value) => setFieldValue('skills', value)}
            />

            <Select
              label='Country'
              placeholder='Select country'
              value={values.country}
              data={COUNTRIES}
              searchable
              clearable
              onChange={(value) => setFieldValue('country', value!)}
            />

            <TextInput
              label='City'
              placeholder='City/Towm'
              leftSection={<IconMapPin size={16} />}
              {...getInputProps('city')}
            />

            <Radio.Group
              name='experienceLevel'
              value={values.experienceLevel}
              label='Experience level'
              onChange={(value) => setFieldValue('experienceLevel', value)}
            >
              <Stack gap={12} pt={8} pl={20}>
                {EXPERIENCE_LEVELS.map((lv) => (
                  <Radio key={lv} value={lv} label={lv} />
                ))}
              </Stack>
            </Radio.Group>

            <Textarea
              label='Tell about position'
              autosize
              minRows={5}
              {...getInputProps('summary')}
            />

            <Radio.Group
              name='englishLevel'
              value={values.englishLevel}
              label='English level'
              defaultValue={ENGLISH_LEVELS[0]}
              onChange={(value) => setFieldValue('englishLevel', value)}
            >
              <Stack gap={12} pt={8} pl={20}>
                {ENGLISH_LEVELS.map((lvl) => (
                  <Radio key={lvl} value={lvl} label={lvl} />
                ))}
              </Stack>
            </Radio.Group>

            <Checkbox.Group
              label='Employment'
              value={values.employment}
              onChange={(value) => setFieldValue('employment', value)}
            >
              <Group mt='xs'>
                {EMPLOYMENT.map((e) => (
                  <Checkbox key={e} label={e} value={e} />
                ))}
              </Group>
            </Checkbox.Group>

            {vacancy._id && (
              <Checkbox
                label='Arhive position'
                {...getInputProps('isArchive', { type: 'checkbox' })}
              />
            )}

            <Button type='submit' disabled={isLoading}>
              {vacancy._id ? 'Update vacancy' : 'Create vacancy'}
            </Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}
