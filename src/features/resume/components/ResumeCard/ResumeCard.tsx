import {
  Card,
  Text,
  Group,
  Badge,
  Image,
  Stack,
  Flex,
  Title,
  Box,
  rem,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import {
  IconMapPin,
  IconCrown,
  IconChartBar,
  IconLanguage,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { API_SERVER, DEFAULT_AVATAR } from 'shared/constants';
import { ROUTES } from 'shared/routes';
import classes from './ResumeCard.module.scss';

import { IResume, ISeekerAccount } from '../../../types';

type ResumeCardProps = {
  resume: IResume;
};

export default function ResumeCard({ resume }: ResumeCardProps) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    position,
    salaryExpectations,
    country,
    city,
    workExperience,
    experienceLevel,
    owner,
    englishLevel,
  } = resume;

  const { avatar, firstName, lastName, searchStatus } = owner as ISeekerAccount;

  const navigate = useNavigate();
  const { t } = useTranslation();

  const navigateHandler = () => {
    navigate(`${ROUTES.resumes}/${_id}`);
  };

  return (
    <Card
      shadow='sm'
      radius={0}
      className={classes.card}
      onClick={navigateHandler}
    >
      <Flex>
        <Box className={classes.avatarBox}>
          <Image
            fallbackSrc={DEFAULT_AVATAR}
            src={`${API_SERVER}/${avatar}`}
            w={rem(160)}
            h={rem(160)}
          />
          <Badge
            className={classes.badge}
            color={searchStatus ? 'green' : 'gray'}
          >
            {searchStatus ? t('active_search') : t('passive_search')}
          </Badge>
        </Box>

        <Stack gap={4} w='100%' className={classes.content}>
          <Flex align='center' justify='space-between' w='100%'>
            <Title order={3} c='primary'>
              {position}, {salaryExpectations} $
            </Title>
          </Flex>

          <Text fz='lg'>
            {firstName} {lastName}
          </Text>

          <Flex gap={rem(16)}>
            <Flex gap={6} align='center'>
              <IconCrown stroke='secondary' size={18} />
              <Text c='secondary'>{workExperience} years</Text>
            </Flex>

            <Flex gap={6} align='center'>
              <IconChartBar stroke='secondary' size={18} />
              <Text c='secondary'>{experienceLevel}</Text>
            </Flex>

            <Flex gap={6} align='center'>
              <IconLanguage stroke='secondary' size={18} />
              <Text c='secondary'>{englishLevel}</Text>
            </Flex>
          </Flex>

          <Group align='center'>
            <Flex gap={6} align='center'>
              <IconMapPin stroke='secondary' size={18} />
              <Text c='secondary'>
                {country}, {city}
              </Text>
            </Flex>
          </Group>
        </Stack>
      </Flex>
    </Card>
  );
}
