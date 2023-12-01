import { Outlet } from 'react-router-dom';
import { Box, Stack } from '@mantine/core';
import { Footer } from 'components';
import classes from './AuthLayout.module.scss';

export default function AuthLayout() {
  return (
    <Stack className={classes.layout}>
      <Box component='main' className={classes.main}>
        <Outlet />
      </Box>
      <Footer />
    </Stack>
  );
}
