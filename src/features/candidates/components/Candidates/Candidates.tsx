import { Stack } from '@mantine/core';
import { useAppSelector } from 'store/hooks';
import { selectCandidates } from '../../candidatesSlice';
import { CandidateCard } from '../CandidateCard';

export default function Candidates() {
  const candidates = useAppSelector(selectCandidates);

  return (
    <Stack gap={24}>
      {candidates.map((candidate) => (
        <CandidateCard key={candidate._id} candidate={candidate} />
      ))}
    </Stack>
  );
}
