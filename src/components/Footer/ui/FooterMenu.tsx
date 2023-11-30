import { useTranslation } from 'react-i18next';
import { Stack, Text, Anchor, rem } from '@mantine/core';

export default function FooterMenu() {
  const { t } = useTranslation();

  const configMenu = [
    {
      key: t('bookings_support'),
      links: [
        {
          title: 'COVID-19',
          href: '/',
        },
        {
          title: t('help_center'),
          href: '/',
        },
        {
          title: t('support'),
          href: '/',
        },
        {
          title: t('trust_safety'),
          href: '/',
        },
      ],
    },
    {
      key: t('community'),
      links: [
        {
          title: t('against_discrimination'),
          href: '/',
        },
        {
          title: t('invite_friends'),
          href: '/',
        },
        {
          title: t('gift_cards'),
          href: '/',
        },
      ],
    },
    {
      key: t('about'),
      links: [
        {
          title: t('how_it_works'),
          href: '/',
        },
        {
          title: t('careers'),
          href: '/',
        },
        {
          title: t('about_us'),
          href: '/',
        },
        {
          title: t('media'),
          href: '/',
        },
      ],
    },
    {
      key: t('Become an employer'),
      links: [
        {
          title: t('post_your_job'),
          href: '/',
        },
        {
          title: t('business_account'),
          href: '/',
        },
        {
          title: t('resource_center'),
          href: '/',
        },
      ],
    },
  ];

  return (
    <>
      {configMenu.map((el) => (
        <Stack key={el.key} gap={rem(40)}>
          <Text fz={rem(18)} lh={rem(20)}>
            {el.key}
          </Text>
          <Stack gap={rem(24)}>
            {el.links.map((item) => (
              <Anchor
                key={item.title}
                href={item.href}
                target='_blank'
                fz={rem(16)}
                lh={rem(20)}
                c='secondary'
              >
                {item.title}
              </Anchor>
            ))}
          </Stack>
        </Stack>
      ))}
    </>
  );
}
