import { useForm, zodResolver } from '@mantine/form';
import { Box, Button, TextInput, Stack } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { forgotPasswordSchema } from './schema';

export default function ForgotPasswordForm() {
  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: zodResolver(forgotPasswordSchema),
  });

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
        <Button type='submit'>{t('send_email')}</Button>
      </Stack>
    </Box>
  );
}
