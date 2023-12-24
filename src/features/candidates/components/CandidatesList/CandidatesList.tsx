import { Stack, Text, Card, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

import { useAppSelector } from 'store/hooks';
import { ROUTES } from 'shared/routes';
import { selectCandidates } from '../../candidateSlice';

export default function ResumeList() {
  const candidates = useAppSelector(selectCandidates);

  return (
    <Stack>
      {candidates.map(
        ({
          _id,
          resume: {
            position,
            category,
            workExperience,
            salaryExpectations,
            englishLevel,
          },
        }) => (
          <Card key={_id} shadow='sm' padding='md' radius='md' withBorder>
            <Text>Position: {position}</Text>
            <Text>Category: {category}</Text>
            <Text>Work experience: {workExperience} years</Text>
            <Text>Salary expectations: ${salaryExpectations}</Text>
            <Text>English level: {englishLevel}</Text>
            <Link to={`${ROUTES.candidates}/${_id}`}>
              <Button>see details</Button>
            </Link>
          </Card>
        ),
      )}
    </Stack>
  );
}
