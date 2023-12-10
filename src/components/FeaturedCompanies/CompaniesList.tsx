import { Title, Card, Text, Button, Group, Badge } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from 'shared/routes';
import { IconStarFilled } from '@tabler/icons-react';

export default function CompaniesList() {
  const { t } = useTranslation();

  const companyConfig = [
    {
      id: 1,
      name: 'Amazon',
      rating: 4.5,
      reviews: 261,
      description: 'World Largest Internet Company',
    },
    {
      id: 2,
      name: 'Airbnb',
      rating: 4.5,
      reviews: 261,
      description: 'World Largest Internet Company',
    },
    {
      id: 3,
      name: 'Dropbox',
      rating: 4.5,
      reviews: 261,
      description: 'World Largest Internet Company',
    },
    {
      id: 4,
      name: 'Paypal',
      rating: 4.5,
      reviews: 261,
      description: 'World Largest Internet Company',
    },
    {
      id: 5,
      name: 'Google',
      rating: 4.5,
      reviews: 261,
      description: 'World Largest Internet Company',
    },
  ];

  return companyConfig.map(({ id, name, rating, reviews, description }) => (
    <Card key={id} shadow='sm' padding='md' radius='md' withBorder>
      <Title order={4}>{name}</Title>

      <Text size='sm' c='dimmed' mt='md'>
        {description}
      </Text>

      <Group mt='md'>
        <IconStarFilled />
        {rating}
        <Badge color='pink' variant='light'>
          {reviews} {t('reviews')}
        </Badge>
      </Group>

      <Link to={`${ROUTES.companies}/${id}`}>
        <Button variant='light' color='blue' mt='md'>
          {t('view_jobs')}
        </Button>
      </Link>
    </Card>
  ));
}
