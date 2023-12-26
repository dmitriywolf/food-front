import { useTranslation } from 'react-i18next';
import { Container, Stack, Flex, Text, Box, Group, rem } from '@mantine/core';
import { ThemeSwitch, LangSwitch } from 'components';

// import FooterMenu from './FooterMenu';

import classes from './Footer.module.scss';
// import FooterTop from './FooterTop';

export default function RootFooter() {
  const { t } = useTranslation();

  return (
    <Box component='footer' className={classes.footer}>
      <Container size='responsive'>
        <Stack gap={rem(32)}>
          {/* <FooterTop /> */}

          <Flex className={classes.menu}>
            <Text>@2024 {t('all_rights_reserved')}</Text>
            {/* <FooterMenu /> */}
            <Group gap={8}>
              <ThemeSwitch />
              <LangSwitch />
            </Group>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}
