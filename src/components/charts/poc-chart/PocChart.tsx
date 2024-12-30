'use client';
import type { ChartData } from 'chart.js';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { TypeEventSummaryOut } from '@/__generated__/data-contracts';
import RichText from '@/components/RichText';
import Checkboxes from '@/ui/checkboxes/checkboxes';

import BaseChart from '../base/BaseChart';
import { getPocChartDatasets } from './getPocChartDatasets';

export type PocChartDataType = Pick<TypeEventSummaryOut, | 'updateTime'
  | 'dataSource'
  | 'collisionProbability'
  | 'tcaTime'
  | 'primaryObjectCdmType'>[];

export type PocChartProps = {
  data: PocChartDataType;
};

export function PocChart({ data }: PocChartProps) {
  const t = useTranslations('Charts.Poc_chart');
  const [showSpecial, setShowSpecial] = useState(true);

  const sortedData = useMemo(
    () => data.sort((a, b) => Date.parse(a.updateTime) - Date.parse(b.updateTime)),
    [data],
  );

  const tca = useMemo(
    () => sortedData[sortedData.length - 1]?.tcaTime,
    [sortedData],
  );

  const specialData = useMemo(
    () => sortedData.filter(data => data.primaryObjectCdmType === 'Special owner/operator ephemeris'),
    [sortedData],
  );

  const datasets: ChartData = getPocChartDatasets({ sortedData, specialData, showSpecial, tca });

  return (
    <div data-pdf={t('title')} data-canvas className="mb-4">
      <RichText>
        {tags => t.rich('description', tags) }
      </RichText>
      <BaseChart
        name="poc-chart"
        data={datasets}
        xAxisTitle={t('xAxis')}
        yAxisTitle={t('yAxis')}
        referenceLineTitle={t('tca')}
        referenceLineValue={tca}
        tickYCallback={(value: number) => value === 0 ? 0 : Number(value).toExponential(2)}
        legend={{ title: 'Data source' }}
        actionButtons={
          specialData.length > 0 && (
            <Checkboxes
              name="poc-show-special-ephemeris"
              items={[
                {
                  id: 'show-special-ephemeris',
                  children: (
                    <RichText>
                      {tags => t.rich('special', tags) }
                    </RichText>
                  ),
                  checked: showSpecial,
                  onChange: () => setShowSpecial(state => !state),
                },
              ]}
              smaller
            />
          )
        }
      />
    </div>
  );
}

export default PocChart;
