import { useForm, zodResolver } from '@mantine/form';
import { Box, Button, TextInput, Stack, Card } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { profileInfoSchema } from './schema';
import type { ProfileInfoFormValues } from './types';

import classes from './ProfileInfo.module.scss';

export default function ProfileInfo() {
  const { t } = useTranslation();

  const form = useForm<ProfileInfoFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      portfolio: '',
    },
    validate: zodResolver(profileInfoSchema),
  });

  const onSubmit = (values: ProfileInfoFormValues) => {
    console.log('VALUES', values);
  };

  return (
    <Box component='section' className={classes.profile}>
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
              readOnly
              {...form.getInputProps('phone')}
            />
            <TextInput
              label='LinkedIn'
              placeholder='https://'
              readOnly
              {...form.getInputProps('linkedin')}
            />
            <TextInput
              label='GitHub'
              placeholder='https://'
              readOnly
              {...form.getInputProps('github')}
            />
            <TextInput
              label='Portfolio'
              placeholder='https://'
              readOnly
              {...form.getInputProps('portfolio')}
            />

            <Button type='submit'>Save changes</Button>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}
