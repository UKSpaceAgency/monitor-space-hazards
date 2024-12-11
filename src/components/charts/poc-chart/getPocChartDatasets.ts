import type { ChartData } from 'chart.js';

import { dayjs, eachDayOfInterval } from '@/libs/Dayjs';

import { brandColors, chartPalette } from '../utils/theme';
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
          data => data.primaryObjectCdmType !== 'Special owner/operator ephemeris'
            && data.dataSource === 'Space-Track CDM',
        )
        .map(data => ({
          x: data.updateTime as any,
          y: data.collisionProbability as any,
        })),
      borderColor: brandColors.SpaceTrack,
      backgroundColor: brandColors.SpaceTrack,
    },
    {
      label: 'UKSA',
      data: sortedData
        .filter(
          data => data.primaryObjectCdmType !== 'Special owner/operator ephemeris'
            && data.dataSource !== 'Space-Track CDM',
        )
        .map(data => ({
          x: data.updateTime as any,
          y: data.collisionProbability as any,
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
              x: data.updateTime as any,
              y: data.collisionProbability as any,
            })),
            pointStyle: 'triangle',
            pointRadius: 5,
            backgroundColor: chartPalette.darkBlue,
          },
        ]
      : []),
  ],
  labels: eachDayOfInterval({
    start: dayjs(sortedData[0]?.updateTime),
    end: dayjs(tca).add(1, 'day'),
  }),
});
