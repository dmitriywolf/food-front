import {
  Container,
  Stack,
  Group,
  Title,
  Button,
  Flex,
  Text,
  Box,
  SimpleGrid,
  rem,
} from '@mantine/core';
import { ROUTES } from 'config/constants';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Socials, Logo } from 'components';

import classes from './Footer.module.scss';

export default function RootFooter() {
  const { t } = useTranslation();

  return (
    <Box component='footer' className={classes.footer}>
      <Container size='responsive'>
        <Stack gap={rem(52)}>
          {/* Footer top */}
          <Group justify='space-between'>
            <Title className={classes.footerTopTitle} order={2}>
              {t('are_you_interested_in_boosting_your_career')}?
            </Title>
            <Link to={ROUTES.LOGIN}>
              <Button>{t('login_to_community')}</Button>
            </Link>
          </Group>

          {/* Footer Center */}
          <SimpleGrid
            className={classes.footerCenter}
            cols={5}
            spacing={rem(88)}
          >
            <Stack gap={rem(32)}>
              <Logo />
              <Socials />
            </Stack>

            {/* <FooterMenu /> */}
          </SimpleGrid>

          {/* Copyright */}
          <Flex className={classes.copyright}>
            <Text>@2023 {t('all_rights_reserved')}</Text>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}
