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
import { API_SERVER, DEFAULT_AVATAR } from 'shared/constants';
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
  IconChartBar,
} from '@tabler/icons-react';
import { formatDT } from 'shared/utils';
import { useAppSelector } from 'store/hooks';
import { selectCurrentResume } from '../../resumeSlice';
import { ISeekerAccount } from '../../../types';

export default function ResumeDetails() {
  const resume = useAppSelector(selectCurrentResume);

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
    owner,
    dontConsider,
    employment,
    experienceLevel,
  } = resume;

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
    searchStatus,
    skype,
    telegram,
  } = owner as ISeekerAccount;

  const items = [
    { title: 'Candidates', href: ROUTES.resumes },
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
              <Flex align='flex-start' justify='space-between'>
                <Title>{position}</Title>
                {updatedAt && <Badge color='grey'>{formatDT(updatedAt)}</Badge>}
              </Flex>

              <Flex align='center' gap={24}>
                <Flex gap={10} align='center'>
                  <IconCoin size={20} />
                  <Text fw='bold' c='cyan'>
                    {salaryExpectations} $
                  </Text>
                </Flex>

                <Flex gap={10} align='center'>
                  <IconChartBar size={20} />
                  <Text fw='bold'>{experienceLevel}</Text>
                </Flex>
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
                  <Text>{englishLevel}</Text>
                </Flex>
              </Flex>

              <Flex gap={8}>
                <Text>Employment:</Text>
                <Flex align='center' gap={12} wrap='wrap'>
                  {employment.map((e) => (
                    <Badge key={e} color='blue'>
                      {e}
                    </Badge>
                  ))}
                </Flex>
              </Flex>

              <Flex gap={8}>
                <Text>I do not consider:</Text>
                <Flex align='center' gap={12} wrap='wrap'>
                  {dontConsider.map((e) => (
                    <Badge key={e} color='gray'>
                      {e}
                    </Badge>
                  ))}
                </Flex>
              </Flex>

              <Flex gap={8}>
                <Text>My skills:</Text>
                <Flex align='center' gap={12} wrap='wrap'>
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
              <Image
                fallbackSrc={DEFAULT_AVATAR}
                src={`${API_SERVER}/${avatar}`}
                w='100%'
                h={250}
                radius='md'
              />
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
