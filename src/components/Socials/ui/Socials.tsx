import { Text, Box, Stack, rem } from '@mantine/core';
import { socialsConfig } from '../config';
import classes from './Socials.module.scss';

export default function Socials() {
  return (
    <Stack gap={rem(20)} align='flex-start'>
      {socialsConfig.map(({ id, title, href, icon }) => (
        <Box component='a' href={href} key={id} className={classes.btn}>
          {icon}
          <Text>{title}</Text>
        </Box>
      ))}
    </Stack>
  );
}
