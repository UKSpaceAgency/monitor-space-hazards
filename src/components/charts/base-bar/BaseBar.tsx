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
import AnnotationPlugin from 'chartjs-plugin-annotation';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

import { chartFontFamily, chartPalette } from '../base/theme';
import { useInViewport } from '../base/useInViewport';
import type { InferChartLegendProps } from '../legend/LegendChart';
import { ChartLegend } from '../legend/LegendChart';

ChartJS.register(Title, Tooltip, Legend, AnnotationPlugin, BarElement);

defaults.color = chartPalette.black;

defaults.font = {
  family: chartFontFamily,
  size: 12,
};

defaults.plugins.legend.position = 'bottom';
defaults.plugins.legend.labels.color = chartPalette.white;
defaults.plugins.legend.labels.usePointStyle = true;
defaults.plugins.legend.labels.font = {
  size: 16,
};

defaults.plugins.tooltip.padding = 15;
defaults.plugins.tooltip.backgroundColor = chartPalette.white;
defaults.plugins.tooltip.titleColor = chartPalette.black;
defaults.plugins.tooltip.bodyColor = chartPalette.black;
defaults.plugins.tooltip.borderColor = 'rgba(0, 0, 0, 0.5)';
defaults.plugins.tooltip.borderWidth = 0.5;
defaults.plugins.tooltip.footerColor = chartPalette.black;

export type BaseBarProps = {
  id?: string;
  data: ChartData<'bar'>;
  yAxisTitle?: string;
  actionButtons?: ReactNode;
  showTotal?: boolean;
  title?: React.ReactNode;
} & InferChartLegendProps;

export function BaseBar({
  id,
  data,
  yAxisTitle,
  actionButtons,
  showTotal,
  title,
  showLegend = false,
  legend,
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
      <div className="flex justify-between">{actionButtons}</div>
      {title}
      <div className="relative w-full">
        <Bar
          aria-label="Bar chart"
          id={id}
          ref={chart}
          data={data}
          options={{
            interaction: {
              intersect: false,
              mode: 'index',
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: tooltipItem => tooltipItem.formattedValue,
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
                stacked: true,
              },
              y: {
                stacked: true,
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
        />
      </div>
      {showLegend && (
        <ChartLegend
          chartRef={chart}
          items={data.datasets}
          {...legend}
        />
      )}
    </div>
  );
}

export default BaseBar;
