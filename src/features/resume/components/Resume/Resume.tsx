import { useEffect } from 'react';
import {
  Box,
  Card,
  TextInput,
  Stack,
  Button,
  Checkbox,
  NumberInput,
  Textarea,
  Group,
  Badge,
  Radio,
  Slider,
  Text,
  Select,
  MultiSelect,
} from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import { useForm, zodResolver } from '@mantine/form';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { Editor } from 'components';
import { notifications } from '@mantine/notifications';
import { formatDT } from 'shared/utils';
import {
  ENGLISH_LEVELS,
  CATEGORIES,
  EXPERIENCE_YEARS,
  EXPERIENCE_LEVELS,
  COUNTRIES,
  SKILLS,
  NOT_CONSIDER_DOMAINS,
  EMPLOYMENT,
} from 'shared/constants';
import { selectIsLoading, selectMyResume } from '../../resumeSlice';
import { editResume, getMyResume } from '../../services';

import type { IResumeFormValues } from './types';
import { resumeSchema } from './schema';

export default function Resume() {
  const dispatch = useAppDispatch();

  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    position,
    category,
    skills,
    workExperience,
    experienceLevel,
    salaryExpectations,
    country,
    city,
    relocation,
    englishLevel,
    summary,
    employment,
    dontConsider,
    createdAt,
    updatedAt,
    isPublished,
  } = useAppSelector(selectMyResume);
  const isLoading = useAppSelector(selectIsLoading);

  const { getInputProps, onSubmit, values, setFieldValue } =
    useForm<IResumeFormValues>({
      initialValues: {
        position,
        category,
        skills,
        workExperience,
        experienceLevel,
        salaryExpectations,
        country,
        city,
        relocation,
        englishLevel,
        summary,
        employment,
        dontConsider,
        isPublished,
      },
      validate: zodResolver(resumeSchema),
    });

  const submitHandler = async (data: IResumeFormValues) => {
    try {
      await dispatch(editResume({ id: _id, ...data })).unwrap();
      notifications.show({
        color: 'green',
        title: 'Edit resume',
        message: 'The resume was successfully updated',
      });
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        title: 'Edit resume',
        message: error as string,
      });
    }
  };

  const isResume = createdAt !== updatedAt;

  const onSummaryUpdate = (v: string) => {
    setFieldValue('summary', v);
  };

  useEffect(() => {
    if (!_id) {
      dispatch(getMyResume());
    }
  }, [_id, dispatch]);

  return (
    <Stack gap={24}>
      <Group justify='end'>
        {isResume && (
          <Badge color='tomato'>Updated: {formatDT(updatedAt)}</Badge>
        )}
        <Badge color={isPublished ? 'green' : 'gray'}>
          {isPublished ? 'Published' : 'Hidden'}
        </Badge>
      </Group>
      <Card shadow='sm' padding='md' radius='md' withBorder>
        <Box component='form' w='100%' onSubmit={onSubmit(submitHandler)}>
          <Stack gap={20}>
            <TextInput
              label='Position'
              placeholder='Search position'
              {...getInputProps('position')}
            />

            <Select
              label='Category'
              placeholder='Select category'
              value={values.category}
              data={CATEGORIES}
              onChange={(value) => setFieldValue('category', value!)}
            />

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

            <NumberInput
              label='Salary expectations, $'
              prefix='$ '
              hideControls
              allowDecimal={false}
              {...getInputProps('salaryExpectations')}
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

            <Checkbox
              label='Consider relocation to another city'
              {...getInputProps('relocation', { type: 'checkbox' })}
            />

            <Radio.Group
              value={values.experienceLevel}
              label='Experience level'
              onChange={(value) => setFieldValue('experienceLevel', value)}
            >
              <Stack gap={12} pt={8} pl={20}>
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <Radio key={lvl} value={lvl} label={lvl} />
                ))}
              </Stack>
            </Radio.Group>

            <Stack gap={4}>
              <Text size='sm' fw='bold' pb={8}>
                Tell about yourself
              </Text>
              <Editor
                content={values.summary}
                placeholder='Please tell about this yourself'
                onChange={onSummaryUpdate}
              />
            </Stack>

            <Radio.Group
              label='English level'
              value={values.englishLevel}
              onChange={(value) => setFieldValue('englishLevel', value)}
            >
              <Stack gap={12} pt={8} pl={20}>
                {ENGLISH_LEVELS.map((lv) => (
                  <Radio key={lv} value={lv} label={lv} />
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

            <Checkbox.Group
              label='I do not consider'
              value={values.dontConsider}
              onChange={(value) => setFieldValue('dontConsider', value)}
            >
              <Group mt='xs'>
                {NOT_CONSIDER_DOMAINS.map((d) => (
                  <Checkbox key={d} label={d} value={d} />
                ))}
              </Group>
            </Checkbox.Group>

            <Checkbox
              label='Publish my resume'
              {...getInputProps('isPublished', { type: 'checkbox' })}
            />

            <Button type='submit' disabled={isLoading}>
              {isResume ? 'Update resume' : 'Create resume'}
            </Button>
          </Stack>
        </Box>
      </Card>
    </Stack>
  );
}
