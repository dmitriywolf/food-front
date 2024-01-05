import {
  Box,
  Card,
  TextInput,
  Image,
  Stack,
  Button,
  Checkbox,
  Flex,
  Badge,
  Group,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import {
  IconUser,
  IconMailFilled,
  IconPhone,
  IconWorldWww,
  IconBrandSkype,
  IconBrandTelegram,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { formatDT } from 'shared/utils';
import { selectUser, selectIsLoading } from '../../userSlice';
import { userEditSeeker } from '../../service';

import type { SeekerProfileFormValues } from './types';
import { seekerProfileSchema } from './schema';
import { ISeekerAccount } from '../../../types';

export default function SeekerProfile() {
  const dispatch = useAppDispatch();

  const seeker = useAppSelector(selectUser) as ISeekerAccount;
  const isLoading = useAppSelector(selectIsLoading);

  const { getInputProps, onSubmit } = useForm<SeekerProfileFormValues>({
    initialValues: {
      searchStatus: seeker?.searchStatus,
      firstName: seeker?.firstName || '',
      lastName: seeker?.lastName || '',
      avatar: seeker?.avatar || '',
      email: seeker?.email || '',
      phone: seeker?.phone || '',
      linkedin: seeker?.linkedin || '',
      github: seeker?.github || '',
      portfolio: seeker?.portfolio || '',
      skype: seeker?.skype || '',
      telegram: seeker?.telegram || '',
    },
    validate: zodResolver(seekerProfileSchema),
  });

  const submitHandler = async (values: SeekerProfileFormValues) => {
    try {
      await dispatch(userEditSeeker({ id: seeker?._id, ...values })).unwrap();

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

  const isResume = seeker?.createdAt !== seeker?.updatedAt;
  const isActiveSearch = !!seeker?.searchStatus;

  return (
    <Stack gap={24}>
      <Group justify='end'>
        {isResume && (
          <Badge color='tomato'>Updated: {formatDT(seeker?.updatedAt)}</Badge>
        )}
        <Badge color={isActiveSearch ? 'green' : 'gray'}>
          {isActiveSearch ? 'Active search' : 'Passive search'}
        </Badge>
      </Group>
      <Card shadow='sm' padding='md' radius='md' withBorder>
        <Box component='form' w='100%' onSubmit={onSubmit(submitHandler)}>
          <Stack gap={12}>
            <Flex gap={24}>
              <Image radius='md' w={200} h={200} src={seeker?.avatar} />

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
                  label='Email'
                  leftSection={<IconMailFilled size={16} />}
                  readOnly
                  {...getInputProps('email')}
                />
              </Stack>
            </Flex>

            <TextInput
              label='Phone'
              leftSection={<IconPhone size={16} />}
              placeholder='+3780'
              {...getInputProps('phone')}
            />
            <TextInput
              label='LinkedIn page'
              leftSection={<IconWorldWww size={16} />}
              placeholder='https://www.linkedin.com/'
              {...getInputProps('linkedin')}
            />
            <TextInput
              label='GitHub page'
              leftSection={<IconWorldWww size={16} />}
              placeholder='https://github.com/'
              {...getInputProps('github')}
            />
            <TextInput
              label='Portfolio page'
              leftSection={<IconWorldWww size={16} />}
              placeholder='https://'
              {...getInputProps('portfolio')}
            />
            <TextInput
              label='Skype'
              leftSection={<IconBrandSkype size={16} />}
              {...getInputProps('skype')}
            />
            <TextInput
              label='Telegram'
              leftSection={<IconBrandTelegram size={16} />}
              placeholder='https://t.me/'
              {...getInputProps('telegram')}
            />

            <TextInput
              leftSection={<IconWorldWww size={16} />}
              label='Avatar'
              {...getInputProps('avatar')}
            />

            <Checkbox
              label='Active search'
              {...getInputProps('searchStatus', { type: 'checkbox' })}
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
