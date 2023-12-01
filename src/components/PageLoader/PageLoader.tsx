import { Box, Loader } from '@mantine/core';
import classes from './PageLoader.module.scss';

export default function PageLoader() {
  return (
    <Box className={classes.overlay}>
      <Loader color='pink' size='xl' type='dots' />
    </Box>
  );
}
