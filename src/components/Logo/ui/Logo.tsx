import { Link } from 'react-router-dom';
import { ROUTES } from 'config/constants';
import { Box, Text } from '@mantine/core';

import classes from './Logo.module.scss';

export default function Logo() {
  return (
    <Link to={ROUTES.home} className={classes.link}>
      <Box className={classes.shape} />
      <Text className={classes.text}>JobMagazine</Text>
    </Link>
  );
}
