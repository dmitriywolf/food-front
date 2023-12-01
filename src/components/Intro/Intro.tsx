import { Container, Stack, Title, Text, rem, Group } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import classes from './Intro.module.scss';

export default function Intro() {
  const { t } = useTranslation();

  return (
    <section className={classes.intro}>
      <Container size='responsive'>
        <Stack
          align='center'
          justify='center'
          gap={rem(24)}
          pt={rem(200)}
          pb={rem(72)}
          className={classes.inner}
        >
          <Title order={1}>{t('find_a_dream_jobs_in_ukraine')}</Title>
          <Text c='secondary'>{t('when_you_re_searching_for_a_job')}</Text>
          <Group>
            <Text c='green'>21,701,403</Text>
            <Text>{t('total_jobs_posted')}</Text>
          </Group>
        </Stack>
      </Container>
    </section>
  );
}
