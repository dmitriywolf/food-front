import { useEffect } from 'react';
import { Flex, Text, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { getTotal } from '../../services';
import { selectTotalJobsCount } from '../../jobsSlice';

export default function TotalJobs() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const total = useAppSelector(selectTotalJobsCount);

  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch]);

  return (
    <Flex gap={rem(12)}>
      <Text size='lg'>{t('total_jobs_posted')}</Text>
      <Text size='lg' c='green'>
        {total}
      </Text>
    </Flex>
  );
}
