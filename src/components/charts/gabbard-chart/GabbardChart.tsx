'use client';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

import type {
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
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useTranslations } from 'next-intl';
import type { ChangeEvent } from 'react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Chart } from 'react-chartjs-2';

import type { GabbardDataResponse } from '@/actions/getFragmentationEventGabbardData';
import Checkboxes from '@/ui/checkboxes/checkboxes';
import { whiteBackgroundPlugin } from '@/utils/ChartPlugins';

import { setChartDefaults } from '../base/defaults';
import { chartPalette } from '../base/theme';
import { useInViewport } from '../base/useInViewport';
import { ChartLegend } from '../legend/LegendChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

setChartDefaults({ isTimeScale: false, isLogarithmicScale: false });

type GabbardChartProps = {
  data: GabbardDataResponse;
};

const GabbardChart = ({ data }: GabbardChartProps) => {
  const chart = useRef<ChartJS>({} as ChartJS);
  const [isMobile] = useInViewport();
  const t = useTranslations('Charts.Gabbard_chart');

  useEffect(() => {
    if (chart.current) {
      defaults.font.size = isMobile ? 10 : 12;
      chart.current.resize();
    }
  }, [isMobile]);

  const [selectedType, setSelectedType] = useState(new Set(['actual_gabbard_points', 'modelled_gabbard_points']));

  const handleSelectType = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedType((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  };

  const { actual_gabbard_points, modelled_gabbard_points } = data;

  const datasets = useMemo(() => ([
    ...(selectedType.has('actual_gabbard_points')
      ? [
          {
            label: t('actual_fragments_apogee_label'),
            data: actual_gabbard_points.map(point => ({ x: point.period, y: point.apogee })),
            backgroundColor: chartPalette.nspocBlue,
            borderColor: chartPalette.nspocBlue,
            showLine: false,
            pointRadius: 1.5,
          },
          {
            label: t('actual_fragments_perigee_label'),
            data: actual_gabbard_points.map(point => ({ x: point.period, y: point.perigee })),
            backgroundColor: chartPalette.nspocRed,
            borderColor: chartPalette.nspocRed,
            showLine: false,
            pointRadius: 1.5,
          },
        ]
      : []),
    ...(selectedType.has('modelled_gabbard_points')
      ? [
          {
            label: t('modelled_fragments_apogee_label'),
            data: modelled_gabbard_points.map(point => ({ x: point.period, y: point.apogee })),
            backgroundColor: chartPalette.nspocYellow,
            borderColor: chartPalette.nspocYellow,
            showLine: false,
            pointRadius: 1.5,
          },
          {
            label: t('modelled_fragments_perigee_label'),
            data: modelled_gabbard_points.map(point => ({ x: point.period, y: point.perigee })),
            backgroundColor: chartPalette.nspocGreen,
            borderColor: chartPalette.nspocGreen,
            showLine: false,
            pointRadius: 1.5,
          },
        ]
      : []
    ),
  ]), [selectedType, actual_gabbard_points, modelled_gabbard_points, t]);

  const legendItems = useMemo(() => datasets
    .filter(({ label }) => !label?.toLowerCase().includes('special')), [datasets]);

  const actionButtons = (
    <Checkboxes
      name="fragment-types"
      aria-label={t('legend_title')}
      items={[
        {
          id: 'actual_gabbard_points',
          children: 'Actual fragments',
          value: 'actual_gabbard_points',
          checked: selectedType.has('actual_gabbard_points'),
        },
        {
          id: 'modelled_gabbard_points',
          children: 'Modelled fragments',
          value: 'modelled_gabbard_points',
          checked: selectedType.has('modelled_gabbard_points'),
        },
      ]}
      onChange={handleSelectType}
      smaller
    >
      <legend className="govuk-fieldset__legend govuk-fieldset__legend--s">{t('legend_title')}</legend>
    </Checkboxes>
  );

  return (
    <div data-type="chart">
      <div className="flex justify-between">
        <div className="flex-1">
          {actionButtons}
        </div>
      </div>
      <div className="border border-black bg-white forced-color-adjust-none">
        <div className="relative w-auto my-4">
          <Chart
            aria-label="Gabbard chart"
            id="gabbard-chart"
            ref={chart}
            type="line"
            data={{ datasets }}
            options={{
              interaction: {
                mode: 'nearest',
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
                legend: {
                  display: false,
                },
                tooltip: {
                  usePointStyle: true,
                  callbacks: {
                    title([context]: Array<TooltipItem<'line'>>) {
                      return t('period', { period: context?.label });
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
                        label += `${context.parsed.y} km`;
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
                  type: 'linear',
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: t('y_axis_title'),
                    align: isMobile ? 'end' : 'center',
                    font: {
                      size: isMobile ? 10 : 16,
                      weight: 'bold',
                    },
                    padding: {
                      bottom: isMobile ? 4 : 20,
                    },
                  },
                },
                x: {
                  type: 'linear',
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 7,
                    align: isMobile ? 'end' : 'center',
                  },
                  title: {
                    display: true,
                    text: t('x_axis_title'),
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
        <ChartLegend
          chartRef={chart}
          items={legendItems}
          ariaLabel={t('legend_title')}
        />

      </div>
    </div>
  );
};

export { GabbardChart };
