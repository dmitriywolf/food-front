import { useState } from 'react';
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
  Center,
  FileButton,
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
import { API_SERVER, DEFAULT_AVATAR } from 'shared/constants';
import { formatDT } from 'shared/utils';
import { selectUser, selectUserIsLoading } from '../../userSlice';
import { userEditEmployer } from '../../service';

import type { IEmployerProfileFormValues } from './types';
import { employerProfileSchema } from './schema';
import type { IEmployerAccount } from '../../../types';

export default function EmployerProfile() {
  const [preview, setPreview] = useState('');

  const dispatch = useAppDispatch();

  const employer = useAppSelector(selectUser) as IEmployerAccount;

  const isLoading = useAppSelector(selectUserIsLoading);

  const { getInputProps, onSubmit, setFieldValue } =
    useForm<IEmployerProfileFormValues>({
      initialValues: {
        firstName: employer?.firstName || '',
        lastName: employer?.lastName || '',
        avatar: employer?.avatar || '',
        email: employer?.email || '',
        phone: employer?.phone || '',
        linkedin: employer?.linkedin || '',
        userPosition: employer?.userPosition || '',
        image: undefined,
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

  const changeImageHandler = (file: File | null) => {
    if (file) {
      setFieldValue('image', file);
      const imageUrl = URL.createObjectURL(file);

      setPreview(imageUrl);
    }
  };

  return (
    <Stack gap={24}>
      <Group justify='end'>
        <Badge color='gray'>Updated: {formatDT(employer?.updatedAt)}</Badge>
      </Group>

      <Card shadow='sm' padding='md' radius='md' withBorder>
        <Box component='form' w='100%' onSubmit={onSubmit(submitHandler)}>
          <Flex gap={24}>
            <Stack gap={12}>
              <Center w={200} h={200}>
                <Image
                  radius='md'
                  fallbackSrc={DEFAULT_AVATAR}
                  src={preview || `${API_SERVER}/${employer?.avatar}`}
                  w={200}
                  h={200}
                />
              </Center>

              <FileButton
                onChange={changeImageHandler}
                accept='image/png,image/jpeg'
              >
                {(props) => (
                  <Button {...props} variant='outline'>
                    Upload Avatar
                  </Button>
                )}
              </FileButton>
            </Stack>

            <Stack gap={12} w='100%'>
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

              <Button type='submit' disabled={isLoading}>
                Update profile
              </Button>
            </Stack>
          </Flex>
        </Box>
      </Card>
    </Stack>
  );
}
