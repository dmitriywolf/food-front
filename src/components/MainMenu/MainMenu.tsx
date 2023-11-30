import { Flex, rem } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function MainMenu() {
  const { t } = useTranslation();

  const configMenu = [
    {
      key: t('find_job'),
      href: '/',
    },
    {
      key: t('statistics'),
      href: '/',
    },
    {
      key: t('blog'),
      href: '/',
    },
  ];
  return (
    <Flex gap={rem(36)}>
      {configMenu.map((item) => (
        <Link key={item.key} to={item.href} target='_blank'>
          {item.key}
        </Link>
      ))}
    </Flex>
  );
}
