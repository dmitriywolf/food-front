import { Container, Flex, Title, Text, Box } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import IntroLogo from 'assets/svg/intro.svg';
import { TotalJobs } from 'features/jobs';

import classes from './Home.module.scss';

function HomePage() {
  const { t } = useTranslation();

  return (
    <Box component='section' className={classes.intro}>
      <Container size='responsive'>
        <Flex className={classes.inner}>
          <IntroLogo />
          <Title order={1} className={classes.title}>
            {t('find_a_dream_jobs_in_ukraine')}
          </Title>
          <Text className={classes.subtitle} c='secondary'>
            {t('when_you_re_searching_for_a_job')}
          </Text>
          <TotalJobs />
        </Flex>
      </Container>
    </Box>
  );
}

export default HomePage;
