import {
  Card,
  Text,
  Group,
  Badge,
  Image,
  Stack,
  Flex,
  Avatar,
} from '@mantine/core';
import { formatDT } from 'shared/utils';
import { IconMapPin, IconUsersGroup } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { API_SERVER, DEFAULT_COMPANY_AVATAR } from 'shared/constants';
import { ICompany } from '../../../types';
import classes from './CompanyCard.module.scss';

type CompanyCardProps = {
  company: ICompany;
};

export default function CompanyCard({ company }: CompanyCardProps) {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    avatar,
    createdAt,
    firstName,
    lastName,
    companyDescription,
    companyEmployeesCount,
    companyHiresCount,
    companyLogo,
    companyName,
    companyOffices,
  } = company;

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate(`${ROUTES.companies}/${_id}`);
  };

  return (
    <Card
      shadow='sm'
      padding='lg'
      radius='md'
      withBorder
      onClick={navigateHandler}
    >
      <Card.Section className={classes.imgWrap}>
        <Image
          fallbackSrc={DEFAULT_COMPANY_AVATAR}
          src={`${API_SERVER}/${companyLogo}`}
          w='100%'
          h={250}
          radius='md'
        />
        <Flex className={classes.avatarWrap}>
          <Avatar src={`${API_SERVER}/${avatar}`} />
          <Text>
            {firstName} {lastName}
          </Text>
        </Flex>
        <Badge className={classes.time} color='cyan'>
          {formatDT(createdAt)}
        </Badge>
      </Card.Section>

      <Stack gap={8} mt='xs'>
        <Group justify='space-between'>
          <Text size='md' c='cyan' fw={500}>
            {companyName}
          </Text>
          {companyHiresCount && <Badge color='pink'>Has hires</Badge>}
        </Group>

        <Flex align='center' gap={4}>
          <IconMapPin size={16} />
          <Text size='sm'>{companyOffices}</Text>
        </Flex>

        <Flex align='center' gap={4}>
          <IconUsersGroup size={16} />
          <Text>{companyEmployeesCount}</Text>
        </Flex>

        <Text size='sm' c='dimmed' ta='justify'>
          {companyDescription}
        </Text>
      </Stack>
    </Card>
  );
}
