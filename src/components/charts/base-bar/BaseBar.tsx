import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

import type {
  ChartData,
} from 'chart.js';
import {
  BarElement,
  Chart as ChartJS,
  defaults,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

import { whiteBackgroundPlugin } from '@/utils/ChartPlugins';

import { setChartDefaults } from '../base/defaults';
import { chartPalette } from '../base/theme';
import { useInViewport } from '../base/useInViewport';
import type { InferChartLegendProps } from '../legend/LegendChart';
import { ChartLegend } from '../legend/LegendChart';
import AnnotationPlugin from '../plugins/plugin-a11y-legend';

ChartJS.register(Title, Tooltip, Legend, AnnotationPlugin, BarElement);

setChartDefaults({ isTimeScale: false, isLogarithmicScale: false });

defaults.plugins.legend.labels.color = chartPalette.white;
defaults.plugins.tooltip.footerColor = chartPalette.black;

export type BaseBarProps = {
  id?: string;
  data: ChartData<'bar'>;
  yAxisTitle?: string;
  xAxisTitle?: string;
  actionButtons?: ReactNode;
  showTotal?: boolean;
  title?: React.ReactNode;
  stacked?: boolean;
  ariaLabel?: string;
} & InferChartLegendProps;

export function BaseBar({
  id,
  data,
  yAxisTitle,
  xAxisTitle,
  actionButtons,
  showTotal,
  title,
  stacked = true,
  showLegend = false,
  legend,
  ariaLabel,
}: BaseBarProps) {
  const chart = useRef<ChartJS<'bar'>>({} as ChartJS<'bar'>);
  const [isMobile] = useInViewport();

  useEffect(() => {
    if (chart.current) {
      defaults.font.size = isMobile ? 10 : 12;
      chart.current.resize();
    }
  }, [isMobile]);

  return (
    <div className="p-4 bg-lightGrey" data-type="chart">
      <div className="flex justify-between mb-4 md:mb-0">{actionButtons}</div>
      {title}
      <div className="border border-black bg-white forced-color-adjust-none">
        <div className="relative w-full">
          <Bar
            aria-label={`${ariaLabel} Bar chart`}
            id={id}
            ref={chart}
            data={data}
            options={{
              interaction: {
                intersect: false,
                mode: 'index',
              },
              layout: {
                padding: {
                  top: isMobile ? 30 : 50,
                  right: isMobile ? 5 : 80,
                  left: isMobile ? 5 : 50,
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      let label = tooltipItem.dataset.label || '';

                      if (label) {
                        label += `: `;
                      }
                      label += tooltipItem.formattedValue;
                      return label;
                    },
                    footer: showTotal
                      ? function (items) {
                        return (
                          `Total: ${items.reduce((a, b) => a + b.parsed.y, 0)}`
                        );
                      }
                      : undefined,
                  },
                },
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  stacked,
                  title: {
                    display: !!xAxisTitle,
                    text: xAxisTitle,
                    font: {
                      size: isMobile ? 8 : 16,
                      weight: 'bold',
                    },
                    padding: {
                      bottom: isMobile ? 10 : 20,
                    },
                  },
                },
                y: {
                  stacked,
                  beginAtZero: true,
                  title: {
                    display: !!yAxisTitle,
                    text: yAxisTitle,
                    font: {
                      size: isMobile ? 8 : 16,
                      weight: 'bold',
                    },
                    padding: {
                      bottom: isMobile ? 10 : 20,
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
            items={data.datasets}
            ariaLabel={ariaLabel}
            {...legend}
          />
        )}
      </div>
    </div>
  );
}

export default BaseBar;
