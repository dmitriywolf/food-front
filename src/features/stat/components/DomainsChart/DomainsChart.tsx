import { useAppSelector } from 'store/hooks';
import { BarChart } from '@mantine/charts';
import { useTranslation } from 'react-i18next';
import {
  selectDomainsStat,
  selectDomainsStatIsLoading,
  selectDomainsError,
} from '../../statSlice';
import { ChartTemplate } from '../ChartTemplate';

export default function DomainsChart() {
  const { t } = useTranslation();

  const data = useAppSelector(selectDomainsStat);
  const loading = useAppSelector(selectDomainsStatIsLoading);
  const error = useAppSelector(selectDomainsError);

  return (
    <ChartTemplate
      title={t('candidates_do_not_want_to_work_with')}
      loading={loading}
      error={error}
    >
      <BarChart
        h={360}
        data={data}
        dataKey='key'
        withLegend
        orientation='vertical'
        withYAxis={false}
        gridAxis='none'
        series={[
          { name: 'Adult', color: 'blue' },
          { name: 'Gambling', color: 'red' },
          { name: 'Dating', color: 'gray' },
          { name: 'GameDev', color: 'green' },
          { name: 'Blockchain', color: 'yellow' },
        ]}
      />
    </ChartTemplate>
  );
}
