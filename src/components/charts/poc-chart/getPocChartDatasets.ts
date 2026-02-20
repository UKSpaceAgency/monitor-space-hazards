import type { ChartData } from 'chart.js';

import { dayjs, eachDayOfInterval } from '@/libs/Dayjs';

import { brandColors, chartPalette } from '../base/theme';
import type { PocChartDataType } from './PocChart';

type Props = {
  sortedData: PocChartDataType;
  specialData: PocChartDataType;
  showSpecial: boolean;
  tca: string | undefined;
};

export const getPocChartDatasets = ({ sortedData, specialData, showSpecial, tca }: Props): ChartData => ({
  datasets: [
    {
      label: 'Space-Track',
      data: sortedData
        .filter(
          data => data.primary_object_cdm_type !== 'Special owner/operator ephemeris'
            && data.data_source === 'Space-Track CDM',
        )
        .map(data => ({
          x: data.update_time as any,
          y: data.collision_probability as any,
        })),
      borderColor: brandColors.SpaceTrack,
      backgroundColor: brandColors.SpaceTrack,
    },
    {
      label: 'UKSA',
      data: sortedData
        .filter(
          data => data.primary_object_cdm_type !== 'Special owner/operator ephemeris'
            && data.data_source !== 'Space-Track CDM',
        )
        .map(data => ({
          x: data.update_time as any,
          y: data.collision_probability as any,
        })),
      borderColor: brandColors.UKSA,
      backgroundColor: brandColors.UKSA,
    },
    ...(showSpecial
      ? [
          {
            label: 'Special ephemeris',
            type: 'scatter' as const,
            data: specialData.map(data => ({
              x: data.update_time as any,
              y: data.collision_probability as any,
            })),
            pointStyle: 'triangle',
            pointRadius: 5,
            backgroundColor: chartPalette.nspocBlue,
          },
        ]
      : []),
  ],
  labels: eachDayOfInterval({
    start: dayjs(sortedData[0]?.update_time),
    end: dayjs(tca).add(1, 'day'),
  }),
});
