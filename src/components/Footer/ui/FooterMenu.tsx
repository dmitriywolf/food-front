import { Flex, rem } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { useTranslation } from 'react-i18next';

export default function FooterMenu() {
  const { t } = useTranslation();

  const menuConfig = [
    {
      value: t('about_us'),
      href: ROUTES.aboutUs,
    },
    {
      value: t('contacts'),
      href: ROUTES.contacts,
    },
    {
      value: t('conditions'),
      href: ROUTES.conditions,
    },
    {
      value: t('faq'),
      href: ROUTES.faq,
    },
  ];

  return (
    <Flex gap={rem(12)}>
      {menuConfig.map(({ value, href }) => (
        <Link key={value} to={href}>
          {value}
        </Link>
      ))}
    </Flex>
  );
}
