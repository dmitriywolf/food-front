import { Outlet } from 'react-router-dom';
import { Stack, Container } from '@mantine/core';
import { Footer, Logo } from 'components';
import classes from './Layout.module.scss';

export default function AuthLayout() {
  return (
    <Stack className={classes.layout}>
      <Container size='responsive' className={classes.main}>
        <Stack gap={32} align='center'>
          <Logo />
          <Outlet />
        </Stack>
      </Container>
      <Footer />
    </Stack>
  );
}
