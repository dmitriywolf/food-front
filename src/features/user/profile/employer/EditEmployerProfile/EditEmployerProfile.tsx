import { Box, Card, TextInput, Stack, Button } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { notifications } from '@mantine/notifications';
import { selectUser, selectIsLoading } from '../../../userSlice';
import { userEditEmployer } from '../../../service';

import type { EditEmployerProfileFormValues } from './types';
import { employerProfileSchema } from './schema';
import type { IEmployer } from '../../../types';

export default function EditEmployerProfile() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectUser) as IEmployer;
  const isLoading = useAppSelector(selectIsLoading);

  const form = useForm<EditEmployerProfileFormValues>({
    initialValues: {
      userPosition: profile?.userPosition || '',
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      linkedin: profile?.linkedin || '',
    },
    validate: zodResolver(employerProfileSchema),
  });

  const onSubmit = async (values: EditEmployerProfileFormValues) => {
    try {
      await dispatch(
        userEditEmployer({ id: profile?._id, ...values }),
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
    <Box component='section'>
      <Card shadow='sm' padding='md' radius='md' withBorder>
        <Box component='form' w='100%' onSubmit={form.onSubmit(onSubmit)}>
          <Stack gap={12}>
            <TextInput
              label='Your post in your company'
              placeholder='You post'
              {...form.getInputProps('userPosition')}
            />
            <TextInput
              label={t('first_name')}
              placeholder={t('first_name')}
              {...form.getInputProps('firstName')}
            />
            <TextInput
              label={t('last_name')}
              placeholder={t('last_name')}
              {...form.getInputProps('lastName')}
            />
            <TextInput
              label='Email'
              placeholder='your@email.com'
              readOnly
              {...form.getInputProps('email')}
            />
            <TextInput
              label='Phone'
              placeholder='+3780'
              {...form.getInputProps('phone')}
            />
            <TextInput
              label='LinkedIn'
              placeholder='https://'
              {...form.getInputProps('linkedin')}
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
