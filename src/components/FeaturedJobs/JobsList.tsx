import {
  Title,
  Card,
  Text,
  Flex,
  Stack,
  Button,
  Group,
  Badge,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from 'shared/routes';

export default function JobsList() {
  const { t } = useTranslation();

  const jobsConfig = [
    {
      id: '1',
      title: 'Junior Graphic Designer (Web)',
      type: 'freelance',
      level: 'senior_lv',
      salary: '11K - 15K',
      company: 'Dropbox',
    },
    {
      id: '2',
      title: 'General Ledger Accountant',
      type: 'part_time',
      level: 'junior_lv',
      salary: '11K - 15K',
      company: 'Figma',
    },
    {
      id: '3',
      title: 'IOS Engineer Backup',
      type: 'part_time',
      level: 'junior_lv',
      salary: '11K - 15K',
      company: 'Amazon',
    },
    {
      id: '4',
      title: 'Project Manager',
      type: 'freelance',
      level: 'middle_lv',
      salary: '11K - 15K',
      company: 'Pinterest',
    },
    {
      id: '5',
      title: 'Product Sales Specialist',
      type: 'internship',
      level: 'senior_lv',
      salary: '11K - 15K',
      company: 'PayPall',
    },
  ];

  return (
    <Stack>
      {jobsConfig.map(({ id, title, type, level, salary, company }) => (
        <Card key={id} shadow='sm' padding='md' radius='md' withBorder>
          <Flex>
            <Group>
              <Title order={4}>{title}</Title>

              <Text size='sm' c='dimmed'>
                {company}
              </Text>

              <Group>
                {t(level)}
                <Badge color='pink' variant='light'>
                  {t(type)}
                </Badge>
              </Group>
            </Group>
          </Flex>

          <Link to={`${ROUTES.jobs}/${id}`}>
            <Button variant='light' color='blue'>
              {t('apply_job')}
            </Button>
          </Link>
        </Card>
      ))}
    </Stack>
  );
}
