'use client';
import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

import type {
  ChartData,
} from 'chart.js';
import {
  ArcElement,
  Chart as ChartJS,
  defaults,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';
import AnnotationPlugin from 'chartjs-plugin-annotation';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';

import { whiteBackgroundPlugin } from '@/utils/ChartPlugins';

import { setChartDefaults } from '../base/defaults';
import { chartPalette } from '../base/theme';
import { useInViewport } from '../base/useInViewport';
import type { InferChartLegendProps } from '../legend/LegendChart';

ChartJS.register(Title, Tooltip, Legend, AnnotationPlugin, ArcElement);

setChartDefaults();

defaults.plugins.legend.position = 'left';
defaults.plugins.tooltip.footerColor = chartPalette.black;

export type BasePieProps = {
  data: ChartData<'pie'>;
  actionButtons?: ReactNode;
  ariaLabel?: string;
} & InferChartLegendProps;

export function BasePie({
  data,
  actionButtons,
  showLegend = true,
  legend,
  ariaLabel,
}: BasePieProps) {
  const chart = useRef<ChartJS<'pie'>>({} as ChartJS<'pie'>);
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
      <div className="relative mx-0 my-auto">
        <Pie
          ref={chart}
          aria-label={`${ariaLabel} Pie chart`}
          data={data}
          options={{
            responsive: true,
            aspectRatio: 2,
            interaction: {
              intersect: false,
              mode: 'index',
            },
            plugins: {
              legend: {
                display: showLegend,
                title: {
                  display: !!legend?.title,
                  text: legend?.title || '',
                  position: 'start',
                  font: {
                    size: isMobile ? 10 : 16,
                    weight: 'bold',
                  },
                },
                position: isMobile ? 'bottom' : 'left',
                labels: {
                  usePointStyle: true,
                  pointStyle: 'rect',
                  font: {
                    size: isMobile ? 10 : 16,
                  },
                },
              },
            },
          }}
          plugins={[whiteBackgroundPlugin]}
        />
      </div>
    </div>
  );
}

export default BasePie;
