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
} from '@mantine/core';
import {
  IconMapPinFilled,
  IconMapPin,
  IconLanguage,
} from '@tabler/icons-react';
import { useForm, zodResolver } from '@mantine/form';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { notifications } from '@mantine/notifications';
import { formatDT } from 'shared/utils';
import { selectIsLoading, selectResume } from '../../resumeSlice';
import { editResume } from '../../services';

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
    employmentOptions,
    createdAt,
    updatedAt,
    isPublished,
  } = useAppSelector(selectResume);
  const isLoading = useAppSelector(selectIsLoading);

  const { getInputProps, onSubmit } = useForm<IResumeFormValues>({
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
      employmentOptions,
      isPublished,
    },
    validate: zodResolver(resumeSchema),
  });

  const submitHandler = async (values: IResumeFormValues) => {
    try {
      await dispatch(editResume({ id: _id, ...values })).unwrap();
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
          <Stack gap={12}>
            <TextInput label='Position' {...getInputProps('position')} />

            <TextInput
              label='Category (Frontend/Backend/Devops..)'
              {...getInputProps('category')}
            />

            <NumberInput
              label='Work experience (years)'
              suffix=' years'
              hideControls
              {...getInputProps('workExperience')}
            />

            <NumberInput
              label='Salary expectations (in $)'
              prefix='$ '
              hideControls
              allowDecimal={false}
              {...getInputProps('salaryExpectations')}
            />
            <TextInput label='Skills' {...getInputProps('skills')} />

            <TextInput
              label='Country of residence'
              leftSection={<IconMapPinFilled size={16} />}
              {...getInputProps('country')}
            />

            <TextInput
              label='City'
              leftSection={<IconMapPin size={16} />}
              {...getInputProps('city')}
            />

            <Checkbox
              label='Relocation'
              {...getInputProps('relocation', { type: 'checkbox' })}
            />

            <TextInput
              label='English level (A2/B1/B2/C1/C2)'
              leftSection={<IconLanguage size={16} />}
              {...getInputProps('englishLevel')}
            />

            <Textarea label='Summary' {...getInputProps('summary')} />

            <TextInput
              label='Employment options (Office/Remote/Part-time)'
              {...getInputProps('employmentOptions')}
            />

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
