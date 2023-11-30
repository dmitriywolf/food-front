import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

import classes from './styles.module.scss';

export default function ThemeSwitch() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });

  const isLightTheme = computedColorScheme === 'light';

  return (
    <ActionIcon
      onClick={() => setColorScheme(isLightTheme ? 'dark' : 'light')}
      variant='default'
      size='lg'
      aria-label='Toggle color scheme'
    >
      {isLightTheme ? (
        <IconMoon className={classes.icon} stroke={1.5} />
      ) : (
        <IconSun className={classes.icon} stroke={1.5} />
      )}
    </ActionIcon>
  );
}
