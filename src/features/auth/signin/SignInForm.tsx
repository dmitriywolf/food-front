import { useForm, zodResolver } from '@mantine/form';
import {
  Box,
  Button,
  TextInput,
  Stack,
  PasswordInput,
  Text,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { IconLock } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { ROUTES } from 'config/constants';
import { signinSchema } from './schema';

export default function SignInForm() {
  const [visible, { toggle }] = useDisclosure(false);
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(signinSchema),
  });

  const icon = (
    <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  return (
    <Box
      component='form'
      w='100%'
      onSubmit={form.onSubmit((values) => console.log(values))}
    >
      <Stack gap={12}>
        <TextInput
          label='Email'
          placeholder='your@email.com'
          {...form.getInputProps('email')}
        />
        <PasswordInput
          label={t('password')}
          placeholder={t('password')}
          leftSection={icon}
          visible={visible}
          onVisibilityChange={toggle}
          {...form.getInputProps('password')}
        />

        <Text>
          <Link to={ROUTES.forgotPassword}>{t('forgot_password')}?</Link>
        </Text>

        <Button type='submit'>{t('signin')}</Button>
      </Stack>
    </Box>
  );
}
