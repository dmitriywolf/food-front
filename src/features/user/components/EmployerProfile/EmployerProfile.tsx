import {
  Box,
  Card,
  Group,
  TextInput,
  Stack,
  Badge,
  Button,
  Flex,
  Image,
} from '@mantine/core';
import {
  IconUser,
  IconMailFilled,
  IconPhone,
  IconWorldWww,
  IconBuilding,
} from '@tabler/icons-react';
import { useForm, zodResolver } from '@mantine/form';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { notifications } from '@mantine/notifications';
import { formatDT } from 'shared/utils';
import { selectUser, selectIsLoading } from '../../userSlice';
import { userEditEmployer } from '../../service';

import type { IEmployerProfileFormValues } from './types';
import { employerProfileSchema } from './schema';
import type { IEmployerAccount } from '../../../types';

export default function EmployerProfile() {
  const dispatch = useAppDispatch();

  const employer = useAppSelector(selectUser) as IEmployerAccount;

  const isLoading = useAppSelector(selectIsLoading);

  const { getInputProps, onSubmit } = useForm<IEmployerProfileFormValues>({
    initialValues: {
      firstName: employer?.firstName || '',
      lastName: employer?.lastName || '',
      avatar: employer?.avatar || '',
      email: employer?.email || '',
      phone: employer?.phone || '',
      linkedin: employer?.linkedin || '',
      userPosition: employer?.userPosition || '',
    },
    validate: zodResolver(employerProfileSchema),
  });

  const submitHandler = async (values: IEmployerProfileFormValues) => {
    try {
      await dispatch(
        userEditEmployer({ id: employer?._id, ...values }),
      ).unwrap();

      notifications.show({
        color: 'green',
        title: 'Edit user info',
        message: 'User data has updated successful',
      });
    } catch (error: unknown) {
      notifications.show({
        color: 'red',
        title: 'Edit user info',
        message: error as string,
      });
    }
  };

  return (
    <Stack gap={24}>
      <Group justify='end'>
        <Badge color='gray'>Updated: {formatDT(employer?.updatedAt)}</Badge>
      </Group>

      <Card shadow='sm' padding='md' radius='md' withBorder>
        <Box component='form' w='100%' onSubmit={onSubmit(submitHandler)}>
          <Stack gap={12}>
            <Flex gap={24}>
              <Image radius='md' w={200} h={200} src={employer?.avatar} />

              <Stack gap={8} w='100%'>
                <TextInput
                  label='First Name'
                  leftSection={<IconUser size={16} />}
                  {...getInputProps('firstName')}
                />
                <TextInput
                  label='Last Name'
                  leftSection={<IconUser size={16} />}
                  {...getInputProps('lastName')}
                />

                <TextInput
                  label='You position in company'
                  placeholder='HR'
                  leftSection={<IconBuilding size={16} />}
                  {...getInputProps('userPosition')}
                />
              </Stack>
            </Flex>

            <TextInput
              label='Email'
              leftSection={<IconMailFilled size={16} />}
              readOnly
              {...getInputProps('email')}
            />
            <TextInput
              label='Phone'
              leftSection={<IconPhone size={16} />}
              placeholder='+3780'
              {...getInputProps('phone')}
            />

            <TextInput
              label='LinkedIn profile'
              leftSection={<IconWorldWww size={16} />}
              placeholder='https://www.linkedin.com/'
              {...getInputProps('linkedin')}
            />

            <TextInput
              leftSection={<IconWorldWww size={16} />}
              label='Avatar'
              {...getInputProps('avatar')}
            />

            <Button type='submit' disabled={isLoading}>
              Update profile
            </Button>
          </Stack>
        </Box>
      </Card>
    </Stack>
  );
}
