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
  Breadcrumbs,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import {
  IconMailFilled,
  IconBrandLinkedin,
  IconPhone,
  IconCoin,
  IconMapPin,
  IconSquareCheckFilled,
  IconLanguage,
  IconChartDonut4,
  IconBrandSkype,
  IconBrandTelegram,
  IconBrandGithub,
  IconUserCode,
  IconSquareCheck,
} from '@tabler/icons-react';
import { formatDT } from 'shared/utils';
import { useAppSelector } from 'store/hooks';
import { selectCurrentCandidate } from '../../candidatesSlice';
import { IResume, ISeekerAccount } from '../../../types';

export default function CandidateDetails() {
  const candidate = useAppSelector(selectCurrentCandidate);

  const {
    avatar,
    email,
    emailVerified,
    firstName,
    github,
    lastName,
    linkedin,
    phone,
    portfolio,
    resume,
    searchStatus,
    skype,
    telegram,
  } = candidate as ISeekerAccount;

  const {
    category,
    city,
    country,
    englishLevel,
    position,
    relocation,
    salaryExpectations,
    skills,
    summary,
    updatedAt,
    workExperience,
  } = resume as IResume;

  const items = [
    { title: 'Candidates', href: ROUTES.candidates },
    { title: `${firstName} ${lastName}`, href: '#' },
  ].map((item) => (
    <Anchor to={item.href} component={Link} key={item.title}>
      {item.title}
    </Anchor>
  ));

  return (
    <Stack>
      <Breadcrumbs>{items}</Breadcrumbs>

      <Grid columns={4}>
        <Grid.Col span={3}>
          <Card shadow='sm' padding='md' radius='md' withBorder>
            <Stack gap={12}>
              <Title>{position}</Title>

              <Flex gap={10} align='center'>
                <IconCoin size={20} />
                <Text fw='bold'>{salaryExpectations} $</Text>
                {updatedAt && (
                  <Badge color='cyan'>Updated: {formatDT(updatedAt)}</Badge>
                )}
              </Flex>

              <Flex align='center' gap={24}>
                <Flex gap={10} align='center'>
                  <IconMapPin size={20} />
                  <Text>
                    {country}, {city}
                  </Text>
                </Flex>
              </Flex>

              <Flex align='center' gap={24}>
                <Flex gap={10} align='center'>
                  <IconChartDonut4 size={20} />
                  <Text>{category}</Text>
                </Flex>

                {relocation && (
                  <Flex gap={10} align='center'>
                    <IconSquareCheck size={20} />
                    <Text>Ready to relocate</Text>
                  </Flex>
                )}
              </Flex>

              <Flex align='center' gap={24}>
                <Flex gap={10} align='center'>
                  <IconSquareCheckFilled size={20} />
                  <Text>Experience: {workExperience} years</Text>
                </Flex>

                <Flex gap={10} align='center'>
                  <IconLanguage size={20} />
                  <Text>English: {englishLevel}</Text>
                </Flex>
              </Flex>

              <Flex direction='column' gap={8}>
                <Text>My skills:</Text>
                <Flex align='center' gap={12}>
                  {skills.map((skill) => (
                    <Badge key={skill} color='cyan'>
                      {skill}
                    </Badge>
                  ))}
                </Flex>
              </Flex>

              <Text>{summary}</Text>
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={1}>
          <Card shadow='sm' padding='md' radius='md' withBorder>
            <Card.Section>
              <Image src={avatar} w='100%' h={250} />
            </Card.Section>
            <Stack gap={12} pt={24}>
              <Group>
                <Title order={2}>
                  {firstName} {lastName}
                </Title>
              </Group>

              <Group gap={8}>
                <Badge color={emailVerified ? 'teal' : 'pink'}>
                  {emailVerified ? 'Verified' : 'Unverified'}
                </Badge>

                <Badge color={searchStatus ? 'green' : 'red'}>
                  {searchStatus ? 'Active search' : 'Passive search'}
                </Badge>
              </Group>

              <Group gap={8}>
                <Flex gap={8}>
                  <IconMailFilled />
                  <Anchor href={`mailto:${email}`} c='teal'>
                    Mail
                  </Anchor>
                </Flex>
                {phone && (
                  <Flex gap={8}>
                    <IconPhone />
                    <Anchor href={`tel:${phone}`} c='teal'>
                      Call
                    </Anchor>
                  </Flex>
                )}
              </Group>

              <Group gap={8}>
                {linkedin && (
                  <Flex gap={8}>
                    <IconBrandLinkedin />
                    <Anchor href={linkedin} c='teal'>
                      LinkedIn
                    </Anchor>
                  </Flex>
                )}

                {telegram && (
                  <Flex gap={8}>
                    <IconBrandTelegram />
                    <Anchor href={telegram} c='teal'>
                      Telegram
                    </Anchor>
                  </Flex>
                )}

                {skype && (
                  <Flex gap={8}>
                    <IconBrandSkype />
                    <Text c='teal'>{skype}</Text>
                  </Flex>
                )}
              </Group>

              <Group gap={8}>
                {github && (
                  <Flex gap={8}>
                    <IconBrandGithub />
                    <Anchor href={github}>{github}</Anchor>
                  </Flex>
                )}

                {portfolio && (
                  <Flex gap={8}>
                    <IconUserCode />
                    <Anchor href={portfolio}>{portfolio}</Anchor>
                  </Flex>
                )}
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
