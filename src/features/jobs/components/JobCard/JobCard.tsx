import {
  Card,
  Text,
  Badge,
  Image,
  Stack,
  Flex,
  Title,
  rem,
  Box,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { formatDT } from 'shared/utils';
import { IconMapPin, IconBuildingFortress } from '@tabler/icons-react';
import { useAppSelector } from 'store/hooks';
import { selectUser } from 'features/user';
import { useNavigate } from 'react-router-dom';
import { API_SERVER, DEFAULT_COMPANY_AVATAR } from 'shared/constants';
import { ROUTES } from 'shared/routes';
import { ICompany, IJob } from '../../../types';
import classes from './JobCard.module.scss';

type JobCardProps = {
  job: IJob;
};

export default function JobCard({ job }: JobCardProps) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    author,
    city,
    country,
    updatedAt,
    salaryRange,
    title,
    isArchive,
    domain,
    applications,
    viewsCount,
  } = job;

  const { companyLogo, companyName } = author as ICompany;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);

  const navigateHandler = () => {
    navigate(`${ROUTES.jobs}/${_id}`);
  };

  const iAlreadyApplied = applications.find((id) => id === user?._id);

  return (
    <Card
      shadow='sm'
      radius={0}
      className={classes.card}
      onClick={navigateHandler}
    >
      <Flex>
        <Stack gap={rem(2)} w='100%' className={classes.content}>
          <Title order={3} c='primary'>
            {title}, {salaryRange} $
          </Title>

          <Text fz='lg'>{companyName}</Text>

          <Flex gap={rem(12)}>
            <Flex gap={rem(6)} align='center'>
              <IconMapPin stroke='secondary' size={18} />
              <Text c='secondary'>
                {country}, {city}
              </Text>
            </Flex>

            <Flex gap={rem(6)} align='center'>
              <IconBuildingFortress stroke='secondary' size={18} />
              <Text c='secondary'>{domain}</Text>
            </Flex>
          </Flex>

          <Flex gap={rem(8)} align='center'>
            <Text c='secondary'>
              {t('views')}:{' '}
              <Text span c='primary' fw='bold'>
                {viewsCount}
              </Text>
            </Text>
            <Text c='secondary'>
              {t('applications')}:{' '}
              <Text span c='primary' fw='bold'>
                {applications.length}
              </Text>
            </Text>
          </Flex>

          <Flex gap={rem(8)} align='center'>
            {iAlreadyApplied && (
              <Badge color='green' className={classes.badge}>
                {t('you_are_applied')}
              </Badge>
            )}
            {isArchive && (
              <Badge color='red' className={classes.badge}>
                {t('archived')}
              </Badge>
            )}
          </Flex>
        </Stack>

        <Box className={classes.avatarBox}>
          <Image
            fallbackSrc={DEFAULT_COMPANY_AVATAR}
            src={`${API_SERVER}/${companyLogo}`}
            w={rem(160)}
            h={rem(160)}
          />
          <Badge className={classes.timeBadge} color='primary'>
            {formatDT(updatedAt)}
          </Badge>
        </Box>
      </Flex>
    </Card>
  );
}
