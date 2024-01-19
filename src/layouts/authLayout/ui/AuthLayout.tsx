import { Outlet } from 'react-router-dom';
import { Stack, Container, rem } from '@mantine/core';
import { Footer, Logo } from 'components';
import classes from './Layout.module.scss';

export default function AuthLayout() {
  return (
    <Stack className={classes.layout}>
      <Container size='responsive' className={classes.main}>
        <Stack gap={rem(32)} align='center'>
          <Logo />
          <Outlet />
        </Stack>
      </Container>
      <Footer />
    </Stack>
  );
}
