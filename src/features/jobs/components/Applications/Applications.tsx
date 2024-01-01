import { Stack } from '@mantine/core';
import { useEffect } from 'react';

import { getMyApplications } from 'features/jobs';

import { useAppSelector, useAppDispatch } from 'store/hooks';
import {
  selectMyApplications,
  // selectIsLoading
} from '../../jobsSlice';
import { JobCard } from '../JobCard';

export default function Applications() {
  const applications = useAppSelector(selectMyApplications);
  // const isLoading = useAppSelector(selectIsLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMyApplications());
  }, [dispatch]);

  return (
    <Stack gap={24}>
      {applications.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </Stack>
  );
}
