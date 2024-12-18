import dayjs from 'dayjs';
import type { Dictionary } from 'lodash';

import type { ManoeuvrePlotPoint } from '@/actions/getManoeuvrePlot';

type ISODateString = string;
type Position = Pick<ScatterChartValue, 'x' | 'y'>;

type BichromaticOptions = {
  thresh: number;
  label: string;
  color: string;
  target: number;
};

export type ScatterChartValue = {
  x: ISODateString;
  y: number | null;
  orbit: number;
  burn_datetime: ISODateString;
  prob: number;
};

type Props = {
  data: ManoeuvrePlotPoint[];
  dataSource: keyof ManoeuvrePlotPoint;
  dataGrouped: Dictionary<ManoeuvrePlotPoint[]>;
  options: BichromaticOptions[];
  keys: string[];
  tca_time: string;
};

const generateThreshold = (
  threshold: number,
  data: Dictionary<ManoeuvrePlotPoint[]>,
  source: keyof ManoeuvrePlotPoint,
): [Position[], Position[]] => {
  return Object.entries(data).reduce<[Position[], Position[]]>(
    ([maxEdges, minEdges], [x, values]) => {
      let minDelta: number | null = null;
      let maxDelta: number | null = null;

      for (const { delta_V, [source]: probability } of values) {
        if (Number(probability) >= threshold) {
          minDelta
                = minDelta === null ? delta_V : Math.min(minDelta, delta_V);
          maxDelta
                = maxDelta === null ? delta_V : Math.max(maxDelta, delta_V);
        }
      }

      return [
        [...maxEdges, { x, y: maxDelta }],
        [...minEdges, { x, y: minDelta }],
      ];
    },
    [[], []],
  );
};

const generateLineDatasets = (
  data: Dictionary<ManoeuvrePlotPoint[]>,
  options: BichromaticOptions[],
  dataSource: keyof ManoeuvrePlotPoint,
) => options
  .map(({ color, label, thresh }) => {
    const [max, min] = generateThreshold(thresh, data, dataSource);
    return [
      {
        label,
        data: max,
        fill: {
          target: '-1',
          above: color,
        },
        borderColor: color,
        backgroundColor: color,
        pointStyle: false,
        spanGaps: false,
      },
      {
        label: null,
        data: min,
        fill: {
          target: '-1',
          below: color,
        },
        borderColor: color,
        backgroundColor: color,
        pointStyle: false,
        spanGaps: false,
      },
    ];
  })
  .flat();

export const getMtpChartDatasets = ({ data, dataSource, dataGrouped, options, keys, tca_time }: Props) => {
  const scatterDatasets = [
    {
      type: 'scatter' as const,
      data: data.map(
        value =>
          ({
            x: value.burn_datetime,
            y: value.delta_V,
            orbit: value.orbit,
            burn_datetime: value.burn_datetime,
            prob: value[dataSource],
          } as ScatterChartValue),
      ),
      pointStyle: false,
    },
  ];

  const newLineDatasets = generateLineDatasets(dataGrouped, options, dataSource);

  const datasets = {
    labels: [
      ...keys,
      tca_time,
      dayjs(tca_time).add(3, 'hours').toISOString(),
    ],
    datasets: [...scatterDatasets, ...newLineDatasets],
  };

  return datasets;
};
