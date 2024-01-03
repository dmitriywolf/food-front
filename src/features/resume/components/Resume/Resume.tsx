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
} from '@mantine/core';
import { IconMapPinFilled, IconMapPin } from '@tabler/icons-react';
import { useForm, zodResolver } from '@mantine/form';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { notifications } from '@mantine/notifications';
import { formatDT } from 'shared/utils';
import { ENGLISH_LEVELS, CATEGORIES } from 'shared/constants';
import { selectIsLoading, selectResume } from '../../resumeSlice';
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
    salaryExpectations,
    country,
    city,
    relocation,
    englishLevel,
    summary,
    remoteWork,
    office,
    partTime,
    freelance,
    createdAt,
    updatedAt,
    isPublished,
  } = useAppSelector(selectResume);
  const isLoading = useAppSelector(selectIsLoading);

  const { getInputProps, onSubmit, values, setFieldValue } =
    useForm<IResumeFormValues>({
      initialValues: {
        position,
        category,
        skills,
        workExperience,
        salaryExpectations,
        country,
        city,
        relocation,
        englishLevel,
        summary,
        remoteWork,
        office,
        partTime,
        freelance,
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
            <TextInput label='Position' {...getInputProps('position')} />

            <Select
              label='Category'
              placeholder='Pick value'
              value={values.category}
              data={CATEGORIES}
              onChange={(value) => setFieldValue('category', value!)}
            />

            <Stack gap={4} pb={12}>
              <Text size='sm' fw='bold'>
                Work experience (years)
              </Text>
              <Slider
                defaultValue={0}
                min={0}
                max={10}
                label={(value) => `${value} years`}
                step={0.5}
                value={values.workExperience}
                marks={[
                  { value: 0, label: 'no' },
                  { value: 0.5, label: '0.5y' },
                  { value: 1, label: '1y' },
                  { value: 1.5, label: '1.5y' },
                  { value: 2, label: '2y' },
                  { value: 2.5, label: '2.5y' },
                  { value: 3, label: '3y' },
                  { value: 3.5, label: '3.5y' },
                  { value: 4, label: '4y' },
                  { value: 5, label: '5y' },
                  { value: 6, label: '6y' },
                  { value: 7, label: '7y' },
                  { value: 8, label: '8y' },
                  { value: 9, label: '9y' },
                  { value: 10, label: '10y' },
                ]}
                onChangeEnd={(value) => setFieldValue('workExperience', value)}
              />
            </Stack>

            <NumberInput
              label='Salary expectations ($)'
              prefix='$ '
              hideControls
              allowDecimal={false}
              {...getInputProps('salaryExpectations')}
            />
            <TextInput label='Skills' {...getInputProps('skills')} />

            <TextInput
              label='Country of residence'
              readOnly
              leftSection={<IconMapPinFilled size={16} />}
              {...getInputProps('country')}
            />

            <TextInput
              label='City'
              leftSection={<IconMapPin size={16} />}
              {...getInputProps('city')}
            />

            <Checkbox
              label='Consider relocation to another city'
              {...getInputProps('relocation', { type: 'checkbox' })}
            />

            <Radio.Group
              name='englishLevel'
              value={values.englishLevel}
              label='English level'
              defaultValue={ENGLISH_LEVELS[0].id}
              onChange={(value) => setFieldValue('englishLevel', value)}
            >
              <Stack gap={12} pt={8} pl={20}>
                {ENGLISH_LEVELS.map(({ id, value }) => (
                  <Radio key={id} value={id} label={value} />
                ))}
              </Stack>
            </Radio.Group>

            <Textarea
              label='Tell about yourself'
              autosize
              minRows={5}
              {...getInputProps('summary')}
            />

            <Stack gap={4}>
              <Text size='sm' fw='bold'>
                Employment options
              </Text>
              <Stack gap={12} pl={20}>
                <Checkbox
                  label='Remote work'
                  {...getInputProps('remoteWork', { type: 'checkbox' })}
                />
                <Checkbox
                  label='Office'
                  {...getInputProps('office', { type: 'checkbox' })}
                />
                <Checkbox
                  label='Part-time'
                  {...getInputProps('partTime', { type: 'checkbox' })}
                />
                <Checkbox
                  label='Freelance (one-time projects)'
                  {...getInputProps('freelance', { type: 'checkbox' })}
                />
              </Stack>
            </Stack>

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
