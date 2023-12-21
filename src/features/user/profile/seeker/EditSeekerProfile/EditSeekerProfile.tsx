import { Box, Card, TextInput, Stack, Button } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { notifications } from '@mantine/notifications';
import { selectUser, selectIsLoading } from '../../../userSlice';
import { userEditSeeker } from '../../../service';

import type { EditSeekerProfileFormValues } from './types';
import { seekerProfileSchema } from './schema';
import type { ISeeker } from '../../../types';

export default function EditSeekerProfile() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const profile = useAppSelector(selectUser) as ISeeker;
  const isLoading = useAppSelector(selectIsLoading);

  const form = useForm<EditSeekerProfileFormValues>({
    initialValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      linkedin: profile?.linkedin || '',
      github: profile?.github || '',
      portfolio: profile?.portfolio || '',
      skype: profile?.skype || '',
      telegram: profile?.telegram || '',
    },
    validate: zodResolver(seekerProfileSchema),
  });

  const onSubmit = async (values: EditSeekerProfileFormValues) => {
    try {
      await dispatch(userEditSeeker({ id: profile?._id, ...values })).unwrap();

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
            <TextInput
              label='GitHub'
              placeholder='https://'
              {...form.getInputProps('github')}
            />
            <TextInput
              label='Portfolio'
              placeholder='https://'
              {...form.getInputProps('portfolio')}
            />
            <TextInput
              label='Skype'
              placeholder='skype'
              {...form.getInputProps('skype')}
            />
            <TextInput
              label='Telegram'
              placeholder='teegram'
              {...form.getInputProps('telegram')}
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
