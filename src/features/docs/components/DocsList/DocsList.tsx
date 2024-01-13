import { useEffect } from 'react';
import { Stack } from '@mantine/core';
import { useAppSelector, useAppDispatch } from 'store/hooks';

import { selectDocs } from '../../docsSlice';
import { getCompanyDocs } from '../../services';
import { DocItem } from '../DocItem';

export default function DocsList() {
  const dispatch = useAppDispatch();

  const docs = useAppSelector(selectDocs);

  useEffect(() => {
    dispatch(getCompanyDocs());
  }, [dispatch]);

  return (
    <Stack gap={4}>
      {docs.map((d) => (
        <DocItem key={d._id} document={d} showControls />
      ))}
    </Stack>
  );
}
