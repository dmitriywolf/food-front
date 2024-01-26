import { useAppSelector } from 'store/hooks';
import { useTranslation } from 'react-i18next';
import { BarChart } from '@mantine/charts';
import {
  selectEmploymentStat,
  selectEmploymentStatIsLoading,
  selectEmploymentError,
} from '../../statSlice';
import { ChartTemplate } from '../ChartTemplate';

export default function EmploymentChart() {
  const { t } = useTranslation();

  const data = useAppSelector(selectEmploymentStat);
  const loading = useAppSelector(selectEmploymentStatIsLoading);
  const error = useAppSelector(selectEmploymentError);

  return (
    <ChartTemplate title={t('employment')} loading={loading} error={error}>
      <BarChart
        h={360}
        data={data}
        dataKey='employment'
        withLegend
        series={[
          { name: 'Vacancies', color: 'blue' },
          { name: 'Candidates', color: 'red' },
        ]}
      />
    </ChartTemplate>
  );
}
