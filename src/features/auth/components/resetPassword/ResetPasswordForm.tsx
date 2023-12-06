import { useForm, zodResolver } from '@mantine/form';
import { Box, Button, Stack, PasswordInput, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useTranslation } from 'react-i18next';
import { IconLock } from '@tabler/icons-react';

import { resetPasswordSchema } from './schema';

export default function ResetPasswordForm() {
  const [visible, { toggle }] = useDisclosure(false);
  const [visibleConfirm, { toggle: toggleConfirm }] = useDisclosure(false);

  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validate: zodResolver(resetPasswordSchema),
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
        <PasswordInput
          label={t('new_password')}
          placeholder='xxxxxxxx'
          leftSection={icon}
          visible={visible}
          onVisibilityChange={toggle}
          {...form.getInputProps('newPassword')}
        />
        <PasswordInput
          label={t('confirm_password')}
          placeholder='xxxxxxxx'
          leftSection={icon}
          visible={visibleConfirm}
          onVisibilityChange={toggleConfirm}
          {...form.getInputProps('confirmPassword')}
        />
        <Button type='submit'>{t('change_password')}</Button>
      </Stack>
    </Box>
  );
}
