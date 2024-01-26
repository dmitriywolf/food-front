import { useAppSelector } from 'store/hooks';
import { BarChart } from '@mantine/charts';
import { useTranslation } from 'react-i18next';
import {
  selectTotalStat,
  selectTotalStatIsLoading,
  selectTotalError,
} from '../../statSlice';
import { ChartTemplate } from '../ChartTemplate';

export default function TotalChart() {
  const { t } = useTranslation();

  const data = useAppSelector(selectTotalStat);
  const loading = useAppSelector(selectTotalStatIsLoading);
  const error = useAppSelector(selectTotalError);

  return (
    <ChartTemplate title={t('comp_vac_can')} loading={loading} error={error}>
      <BarChart
        h={200}
        data={data}
        dataKey='key'
        withLegend
        orientation='vertical'
        withYAxis={false}
        gridAxis='none'
        series={[
          { name: 'Companies', color: 'primary' },
          { name: 'Vacancies', color: 'teal.9' },
          { name: 'Candidates', color: 'cyan.9' },
        ]}
      />
    </ChartTemplate>
  );
}
