'use client';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

import type {
  ChartData,
  TooltipItem,
} from 'chart.js';
import {
  CategoryScale,
  Chart as ChartJS,
  defaults,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  LogarithmicScale,
  PointElement,
  ScatterController,
  TimeScale,
  Title,
  Tooltip,
} from 'chart.js';
import type { LineAnnotationOptions } from 'chartjs-plugin-annotation';
import AnnotationPlugin from 'chartjs-plugin-annotation';
import enGb from 'dayjs/locale/en-gb';
import type {
  ReactNode,
} from 'react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Chart } from 'react-chartjs-2';

import { FORMAT_DATE, FORMAT_DATE_TIME, FORMAT_SHORT_DATE } from '@/libs/Dayjs';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { whiteBackgroundPlugin } from '@/utils/ChartPlugins';

import { ChartLegend, type InferChartLegendProps } from '../legend/LegendChart';
import { setChartDefaults } from './defaults';
import { getReferenceLine } from './referenceLine';
import { useInViewport } from './useInViewport';

ChartJS.register(
  LineController,
  ScatterController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
  TimeScale,
  AnnotationPlugin,
);

setChartDefaults();

export type BaseChartProps = {
  id?: string;
  name: string;
  data: ChartData;
  xAxisTitle?: string;
  yAxisTitle?: string;
  referenceLineTitle?: string;
  referenceLineValue?: number | string;
  tickYCallback?: (value: number) => number | string;
  actionButtons?: ReactNode;
  isDay?: boolean;
  ariaLabel?: string;
} & InferChartLegendProps;

export function BaseChart({
  id,
  name,
  data,
  xAxisTitle,
  yAxisTitle,
  referenceLineTitle,
  referenceLineValue,
  tickYCallback,
  actionButtons,
  isDay,
  showLegend = true,
  legend,
  ariaLabel,
}: BaseChartProps) {
  const chart = useRef<ChartJS>({} as ChartJS);
  const [isMobile] = useInViewport();
  const [scale, setScale] = useState<'logarithmic' | 'linear'>('linear');
  const legendItems = useMemo(() => data.datasets
    .filter(({ label }) => !label?.toLowerCase().includes('special')), [data]);

  const referenceLine: LineAnnotationOptions | undefined = useMemo(
    () => getReferenceLine({ referenceLineTitle, referenceLineValue, isMobile }),
    [referenceLineValue, isMobile, referenceLineTitle],
  );
  useEffect(() => {
    if (chart.current) {
      defaults.font.size = isMobile ? 10 : 12;
      chart.current.resize();
    }
  }, [isMobile]);

  return (
    <div className="p-4 bg-lightGrey" data-type="chart">
      <div className="flex justify-between">
        <div className="flex-1">
          {actionButtons}
        </div>
        <ToggleButtons
          dataPdfIgnore
          name={name}
          ariaLabel={ariaLabel}
          items={[
            {
              id: 'linear',
              title: 'Linear',
              ariaLabel: 'Linear',
              value: 'linear',
            },
            {
              id: 'log',
              title: 'Log',
              ariaLabel: 'Log',
              value: 'logarithmic',
            },
          ]}
          active={scale}
          setActive={setScale}
          title="Scale"
        />
      </div>
      <div className="border border-black bg-white">
        <div className="relative w-auto my-4">
          <Chart
            aria-label={`${ariaLabel} Chart`}
            id={id}
            ref={chart}
            type="line"
            data={data}
            options={{
              interaction: {
                mode: 'x',
                intersect: false,
              },
              elements: {
                line: {
                  cubicInterpolationMode: 'monotone',
                },
              },
              datasets: {
                line: {
                  borderWidth: isMobile ? 1 : 2,
                  pointRadius: isMobile ? 1 : 2,
                  pointHitRadius: isMobile ? 5 : 2,
                  pointBorderWidth: isMobile ? 1 : 2,
                },
              },
              plugins: {
                annotation: {
                  annotations: {
                    referenceLine,
                  },
                },
                legend: {
                  display: false,
                },
                tooltip: {
                  usePointStyle: true,
                  callbacks: {
                    title([context]: Array<TooltipItem<'scatter' | 'line'> & { raw: { x: string; y: string } }>) {
                      if ((context?.dataset?.type === 'scatter')) {
                        return (context?.raw).x;
                      }

                      return context?.label;
                    },
                    labelPointStyle(context) {
                      return {
                        pointStyle: context.dataset.label?.toLowerCase().includes('special')
                          ? 'triangle'
                          : 'circle',
                        rotation: 0,
                      };
                    },
                    label(context) {
                      let label = context.dataset.label || '';

                      if (label) {
                        label += `: `;
                      }
                      if (context.parsed.y !== null) {
                        label += tickYCallback
                          ? tickYCallback(context.parsed.y)
                          : context.parsed.y;
                      }
                      return label;
                    },
                  },
                },
              },
              layout: {
                padding: {
                  top: isMobile ? 5 : 50,
                  right: isMobile ? 5 : 80,
                  left: isMobile ? 5 : 50,
                },
              },
              scales: {
                y: {
                  type: scale,
                  beginAtZero: true,
                  title: {
                    display: !!yAxisTitle,
                    text: yAxisTitle,
                    align: isMobile ? 'end' : 'center',
                    font: {
                      size: isMobile ? 10 : 16,
                      weight: 'bold',
                    },
                    padding: {
                      bottom: isMobile ? 4 : 20,
                    },
                  },
                  ticks: {
                    callback(value) {
                      return tickYCallback
                        ? tickYCallback(value as number)
                        : value;
                    },
                  },
                },
                x: {
                  type: 'time',
                  adapters: {
                    date: {
                      locale: enGb,
                    },
                  },
                  time: {
                    unit: 'day',
                    round: isDay ? 'day' : false,
                    tooltipFormat: referenceLineValue
                      ? FORMAT_DATE_TIME
                      : FORMAT_DATE,
                    displayFormats: {
                      day: isMobile ? FORMAT_SHORT_DATE : FORMAT_DATE,
                    },
                  },
                  ticks: {
                    autoSkip: true,
                    source: 'auto',
                    maxTicksLimit: 7,
                    align: isMobile ? 'end' : 'center',
                  },
                  title: {
                    display: true,
                    text: xAxisTitle,
                    font: {
                      size: isMobile ? 10 : 16,
                      weight: 'bold',
                    },
                  },
                },
              },
            }}
            plugins={[whiteBackgroundPlugin]}
          />
        </div>
        {showLegend && (
          <ChartLegend
            chartRef={chart}
            items={legendItems}
            ariaLabel={ariaLabel}
            {...legend}
          />
        )}
      </div>
    </div>
  );
}

export default BaseChart;
