'use client';
import type { ChartData } from 'chart.js';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { TypeEventSummaryOut } from '@/__generated__/data-contracts';
import RichText from '@/components/RichText';
import Checkboxes from '@/ui/checkboxes/checkboxes';

import BaseChart from '../base/BaseChart';
import { getMissDistanceChartDatasets } from './getMissDistanceChartDatasets';
import styles from './miss-distance-chart.module.scss';

export type MissDistanceChartDataType = Pick<
  TypeEventSummaryOut,
  | 'dataSource'
  | 'updateTime'
  | 'radialMissDistance'
  | 'crosstrackMissDistance'
  | 'intrackMissDistance'
  | 'missDistance'
  | 'tcaTime'
  | 'primaryObjectCdmType'
>[];

export type MissDistanceChartProps = {
  data: MissDistanceChartDataType;
  isSpecial: boolean;
};

export function MissDistanceChart({ data, isSpecial }: MissDistanceChartProps) {
  const t = useTranslations('Charts.MissDistance');

  const [showSpecial, setShowSpecial] = useState(true);

  const sortedData = useMemo(
    () =>
      [...data].sort(
        (a, b) => Date.parse(a.updateTime) - Date.parse(b.updateTime),
      ),
    [data],
  );

  const sortedDataWithoutEphemerises = sortedData.filter(
    data => !isSpecial && data.dataSource === 'Space-Track CDM',
  );
  const sortedDataEphemerises = sortedData.filter(data => data.primaryObjectCdmType === 'Special owner/operator ephemeris');

  const tca = useMemo(
    () => sortedData[sortedData.length - 1]?.tcaTime,
    [sortedData],
  );

  const datasets: ChartData = getMissDistanceChartDatasets({ sortedDataWithoutEphemerises, sortedData, sortedDataEphemerises, showSpecial, tca });

  return (
    <div id="miss-distance-content" className={styles.container}>
      <p className="govuk-body">{t('header')}</p>
      <BaseChart
        id="miss-distance-chart"
        name="miss-distance-chart"
        data={datasets}
        yAxisTitle={t('chart.x_axis_title')}
        xAxisTitle={t('chart.y_axis_title')}
        referenceLineTitle={t('chart.tca')}
        referenceLineValue={tca}
        legend={{ title: 'Vector' }}
        actionButtons={
          sortedDataEphemerises.length > 0 && (
            <Checkboxes
              name="miss-show-special-ephemeris"
              items={[
                {
                  id: 'miss-distance-show-special',
                  children: (
                    <RichText>
                      {tags => t.rich('chart.show_ephemeris', tags) }
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

export default MissDistanceChart;
