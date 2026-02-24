'use client';
import type { ChartData } from 'chart.js';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import type { TypeEventSummaryOut } from '@/__generated__/data-contracts';
import { DownloadData } from '@/components/DownloadData';
import RichText from '@/components/RichText';
import Checkboxes from '@/ui/checkboxes/checkboxes';
import { getAbsoluteValue } from '@/utils/Math';

import BaseChart from '../base/BaseChart';
import { getMissDistanceChartDatasets } from './getMissDistanceChartDatasets';

export type MissDistanceChartDataType = Pick<
  TypeEventSummaryOut,
  | 'data_source'
  | 'update_time'
  | 'radial_miss_distance'
  | 'crosstrack_miss_distance'
  | 'intrack_miss_distance'
  | 'miss_distance'
  | 'tca_time'
  | 'primary_object_cdm_type'
>[];

export type MissDistanceChartProps = {
  data: MissDistanceChartDataType;
  isSpecial: boolean;
};

export function MissDistanceChart({ data, isSpecial }: MissDistanceChartProps) {
  const t = useTranslations('Charts.Miss_distance');

  const [showSpecial, setShowSpecial] = useState(true);

  const absoluteData: MissDistanceChartDataType = useMemo(
    () =>
      data.map(item => ({
        ...item,
        crosstrack_miss_distance: getAbsoluteValue(item.crosstrack_miss_distance ?? 0),
        intrack_miss_distance: getAbsoluteValue(item.intrack_miss_distance ?? 0),
        radial_miss_distance: getAbsoluteValue(item.radial_miss_distance ?? 0),
        miss_distance: getAbsoluteValue(item.miss_distance ?? 0),
      })),
    [data],
  );

  const sortedData = useMemo(() => absoluteData.sort((a, b) => Date.parse(a.update_time) - Date.parse(b.update_time)), [absoluteData]);
  const sortedDataWithoutEphemerises = useMemo(() => sortedData.filter(data => !isSpecial && data.data_source === 'Space-Track CDM'), [isSpecial, sortedData]);
  const sortedDataEphemerises = useMemo(() => sortedData.filter(data => data.primary_object_cdm_type === 'Special owner/operator ephemeris'), []);

  const tca = useMemo(() => sortedData[sortedData.length - 1]?.tca_time, [sortedData]);

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
      <DownloadData type={t('download')} params={{}} downloadAction={async () => data} data-pdf-ignore ariaLabel="Mtp chart" />
    </div>
  );
}

export default MissDistanceChart;
