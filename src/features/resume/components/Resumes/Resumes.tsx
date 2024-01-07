import { Stack } from '@mantine/core';
import { useAppSelector } from 'store/hooks';
import { selectResumes } from '../../resumeSlice';
import { ResumeCard } from '../ResumeCard';

export default function Candidates() {
  const resumes = useAppSelector(selectResumes);

  return (
    <Stack gap={24}>
      {resumes.map((resume) => (
        <ResumeCard key={resume._id} resume={resume} />
      ))}
    </Stack>
  );
}
