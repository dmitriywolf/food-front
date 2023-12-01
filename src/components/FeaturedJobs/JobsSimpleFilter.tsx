import { useTranslation } from 'react-i18next';
import { Stack, Group, Button } from '@mantine/core';
import JobsList from './JobsList';

export default function JobsSimpleFilter() {
  const { t } = useTranslation();

  return (
    <Stack gap={52} w='100%'>
      <Group justify='flex-end'>
        <Button variant='outline'>{t('freelance')}</Button>
        <Button variant='outline'>{t('full_time')}</Button>
        <Button variant='outline'>{t('part_time')}</Button>
        <Button variant='outline'>{t('internship')}</Button>
      </Group>
      <JobsList />
    </Stack>
  );
}
