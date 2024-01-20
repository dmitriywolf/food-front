import {
  Title,
  Card,
  Text,
  Group,
  Badge,
  Grid,
  Stack,
  Flex,
  Anchor,
  Image,
  SimpleGrid,
  Breadcrumbs,
  Tabs,
  rem,
} from '@mantine/core';
import { formatDT } from 'shared/utils';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import {
  IconUsers,
  IconFileDots,
  IconSubtask,
  IconLink,
  IconBrandLinkedin,
  IconPhone,
  IconMapPin,
  IconMail,
} from '@tabler/icons-react';
import { MakeChatButton } from 'features/chats';
import { selectUser } from 'features/user';
import { useAppSelector } from 'store/hooks';
import { useTranslation } from 'react-i18next';
import {
  API_SERVER,
  DEFAULT_COMPANY_AVATAR,
  DEFAULT_AVATAR,
} from 'shared/constants';
import { JobCard } from 'features/jobs';
import { DocItem } from 'features/docs';
import { selectCompany } from '../../companiesSlice';
import classes from './CompanyDetails.module.scss';

export default function CompanyDetails() {
  const { data, jobs, docs } = useAppSelector(selectCompany);
  const user = useAppSelector(selectUser);

  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    _id,
    avatar,
    createdAt,
    firstName,
    lastName,
    linkedin,
    phone,
    userPosition,
    email,
    role,
    companyDescription,
    companyDouPage,
    companyEmployeesCount,
    // companyHiresCount,
    companyLogo,
    companyName,
    companyWebSite,
    companyOffices,
  } = data;

  const { t } = useTranslation();

  const items = [
    { title: t('companies'), href: ROUTES.companies },
    { title: companyName, href: '#' },
  ].map((item) => (
    <Anchor to={item.href} component={Link} key={item.title}>
      {item.title}
    </Anchor>
  ));

  const showTabs = docs?.length > 0 || jobs.length > 0;

  return (
    <Stack>
      <Breadcrumbs>{items}</Breadcrumbs>

      <Grid columns={4}>
        {/* Company */}
        <Grid.Col span={3}>
          <Card shadow='sm' radius={0} className={classes.card}>
            <Card.Section className={classes.avatarBox}>
              <Image
                fallbackSrc={DEFAULT_COMPANY_AVATAR}
                src={`${API_SERVER}/${companyLogo}`}
                w='100%'
                h={250}
              />
              {createdAt && (
                <Badge color='primary' className={classes.badgeAvatar}>
                  {formatDT(createdAt)}
                </Badge>
              )}
            </Card.Section>

            <Stack gap={rem(12)} pt={rem(16)}>
              <Title order={2} ta='center'>
                {companyName}
              </Title>

              <SimpleGrid cols={2}>
                <Stack gap={rem(12)}>
                  <Flex align='center' gap={rem(8)}>
                    <IconMapPin />
                    <Text>{companyOffices}</Text>
                  </Flex>
                  <Flex align='center' gap={rem(8)}>
                    <IconUsers />
                    <Text>
                      {companyEmployeesCount} {t('employees')}
                    </Text>
                  </Flex>

                  {/* {companyHiresCount && (
                    <Flex gap={8}>
                      <IconUserPlus />
                      <Text>Hires: {companyHiresCount}</Text>
                    </Flex>
                  )} */}
                </Stack>

                <Stack gap={rem(12)}>
                  <Flex gap={rem(8)}>
                    <IconLink />
                    <Anchor href={companyWebSite}>{companyWebSite}</Anchor>
                  </Flex>
                  <Flex gap={rem(8)}>
                    <IconLink />
                    <Anchor href={companyDouPage}>{companyDouPage}</Anchor>
                  </Flex>
                </Stack>
              </SimpleGrid>

              <Text c='secondary'>{companyDescription}</Text>
            </Stack>
          </Card>

          {/* TABS */}
          {showTabs && (
            <Tabs defaultValue='jobs' pt={rem(24)}>
              <Tabs.List>
                {jobs.length > 0 && (
                  <Tabs.Tab value='jobs' leftSection={<IconSubtask />}>
                    {t('jobs')}
                  </Tabs.Tab>
                )}

                {docs?.length > 0 && (
                  <Tabs.Tab value='docs' leftSection={<IconFileDots />}>
                    {t('company_docs')}
                  </Tabs.Tab>
                )}
              </Tabs.List>

              <Tabs.Panel value='jobs'>
                <Stack gap={rem(12)} pt={rem(16)}>
                  {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value='docs'>
                <Stack gap={rem(12)} pt={rem(16)}>
                  {docs.map((d) => (
                    <DocItem key={d._id} document={d} />
                  ))}
                </Stack>
              </Tabs.Panel>
            </Tabs>
          )}
        </Grid.Col>

        {/* Employer */}
        <Grid.Col span={1}>
          <Card shadow='sm' radius={0} className={classes.card}>
            <Card.Section className={classes.avatarBox}>
              <Image
                fallbackSrc={DEFAULT_AVATAR}
                src={`${API_SERVER}/${avatar}`}
                w='100%'
                h={250}
              />

              <Badge className={classes.badgeAvatar} color='gray'>
                {userPosition}
              </Badge>
            </Card.Section>

            <Stack gap={rem(12)} pt={rem(12)}>
              <Title order={2}>
                {firstName} {lastName}
              </Title>

              <Group gap={rem(12)}>
                <Flex gap={rem(8)}>
                  <IconMail stroke='secondary' />
                  <Anchor href={`mailto:${email}`}>E-Mail</Anchor>
                </Flex>

                {phone && (
                  <Flex gap={rem(8)}>
                    <IconPhone stroke='secondary' />
                    <Anchor href={`tel:${phone}`}>{t('call')}</Anchor>
                  </Flex>
                )}

                {linkedin && (
                  <Flex gap={rem(8)}>
                    <IconBrandLinkedin stroke='secondary' />
                    <Anchor href={linkedin}>LinkedIn</Anchor>
                  </Flex>
                )}
              </Group>
              {user?.role !== role && <MakeChatButton id={_id} />}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
