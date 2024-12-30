'use client';
import type { ChartData } from 'chart.js';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { TypeEventSummaryOut } from '@/__generated__/data-contracts';
import RichText from '@/components/RichText';
import Checkboxes from '@/ui/checkboxes/checkboxes';
import { getAbsoluteValue } from '@/utils/Math';

import BaseChart from '../base/BaseChart';
import { getMissDistanceChartDatasets } from './getMissDistanceChartDatasets';

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
  const t = useTranslations('Charts.Miss_distance');

  const [showSpecial, setShowSpecial] = useState(true);

  const absoluteData: MissDistanceChartDataType = useMemo(() => data.map(item => ({
    ...item,
    crosstrackMissDistance: getAbsoluteValue(item.crosstrackMissDistance),
    intrackMissDistance: getAbsoluteValue(item.intrackMissDistance),
    radialMissDistance: getAbsoluteValue(item.radialMissDistance),
    missDistance: getAbsoluteValue(item.missDistance)!,
  })), [data]);

  const sortedData = useMemo(() => absoluteData.sort((a, b) => Date.parse(a.updateTime) - Date.parse(b.updateTime)), [absoluteData]);
  const sortedDataWithoutEphemerises = useMemo(() => sortedData.filter(data => !isSpecial && data.dataSource === 'Space-Track CDM'), [isSpecial, sortedData]);
  const sortedDataEphemerises = useMemo(() => sortedData.filter(data => data.primaryObjectCdmType === 'Special owner/operator ephemeris'), []);

  const tca = useMemo(() => sortedData[sortedData.length - 1]?.tcaTime, [sortedData]);

  const datasets: ChartData = getMissDistanceChartDatasets({ sortedDataWithoutEphemerises, sortedData, sortedDataEphemerises, showSpecial, tca });

  return (
    <div id="miss-distance-content" className="mb-4">
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
