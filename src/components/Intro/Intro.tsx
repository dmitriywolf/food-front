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
          className={classes.introInner}
        >
          <Title order={1} c='white' maw={rem(800)} ta='center'>
            {t('find_a_dream_jobs_in_ukraine')}
          </Title>
          <Text c='secondary' maw={rem(600)} fz={rem(20)} ta='center'>
            {t('when_you_re_searching_for_a_job')}
          </Text>
          <Group>
            <Text c='green' fz={rem(20)}>
              21,701,403
            </Text>
            <Text c='white' maw={rem(600)} fz={rem(20)} ta='center'>
              {t('total_jobs_posted')}
            </Text>
          </Group>
        </Stack>
      </Container>
    </section>
  );
}
