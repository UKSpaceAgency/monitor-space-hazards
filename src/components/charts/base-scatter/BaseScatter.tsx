import 'chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm';

import type {
  ChartData,
  TooltipOptions,
} from 'chart.js';
import {
  CategoryScale,
  Chart as ChartJS,
  defaults,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  ScatterController,
  Tooltip,
} from 'chart.js';
import type {
  LineAnnotationOptions,
} from 'chartjs-plugin-annotation';
import AnnotationPlugin from 'chartjs-plugin-annotation';
import enGb from 'dayjs/locale/en-gb';
import type {
  ReactNode,
} from 'react';
import {
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Chart } from 'react-chartjs-2';

import { FORMAT_DATE, FORMAT_SHORT_DATE } from '@/libs/Dayjs';
import { whiteBackgroundPlugin } from '@/utils/ChartPlugins';

import { setChartDefaults } from '../base/defaults';
import { getReferenceLine } from '../base/referenceLine';
import { useInViewport } from '../base/useInViewport';
import type { InferChartLegendProps } from '../legend/LegendChart';
import { ChartLegend } from '../legend/LegendChart';

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  ScatterController,
  AnnotationPlugin,
  Filler,
);

setChartDefaults({ isTimeScale: true, isLogarithmicScale: false });

export type BaseScatterProps = {
  data: ChartData<'scatter'>;
  actionButtons?: ReactNode;
  xAxisTitle?: string;
  yAxisTitle?: string;
  referenceLineTitle?: string;
  referenceLineValue?: string;
  tooltipConfig: TooltipOptions;
  showGrid?: boolean;
  min?: string;
  ariaLabel?: string;
} & InferChartLegendProps;

export function BaseScatter({
  data,
  actionButtons,
  xAxisTitle,
  yAxisTitle,
  referenceLineTitle,
  referenceLineValue,
  tooltipConfig,
  showGrid = true,
  showLegend = true,
  legend,
  min,
  ariaLabel,
}: BaseScatterProps) {
  const chart = useRef<ChartJS>({} as ChartJS);
  const [isMobile] = useInViewport();
  const legendItems = useMemo(() => data.datasets
    .filter(({ label }) => label !== undefined && label !== null)
    .reverse(), [data]);

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
    <div className="bg-lightGrey" data-type="chart">
      <div className="flex justify-between">{actionButtons}</div>
      <div className="border border-black bg-white forced-color-adjust-none">
        <div className="lg:my-2 my-auto relative">
          <Chart
            aria-label="Scatter chart"
            ref={chart}
            type="line"
            data={data}
            options={{
              aspectRatio: 1.5,
              interaction: {
                intersect: false,
                mode: 'nearest',
              },
              scales: {
                y: {
                  border: {
                    display: false,
                  },
                  grid: {
                    display: showGrid,
                    drawOnChartArea: false,
                    z: -1,
                  },
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
                    font: {
                      size: isMobile ? 10 : 12,
                    },
                  },
                },
                x: {
                  border: {
                    display: false,
                  },
                  grid: {
                    display: showGrid,
                    drawOnChartArea: false,
                    z: -1,
                  },
                  type: 'time',
                  adapters: {
                    date: {
                      locale: enGb,
                    },
                  },
                  min,
                  time: {
                    unit: 'day',
                    displayFormats: {
                      day: isMobile ? FORMAT_SHORT_DATE : FORMAT_DATE,
                    },
                    tooltipFormat: FORMAT_DATE,
                  },
                  ticks: {
                    autoSkip: true,
                    source: 'auto',
                    maxTicksLimit: isMobile ? 4 : 10,
                    padding: 2,
                    align: isMobile ? 'end' : 'center',
                    font: {
                      size: isMobile ? 10 : 12,
                    },
                  },
                  title: {
                    display: !!xAxisTitle,
                    text: xAxisTitle,
                    font: {
                      size: isMobile ? 10 : 16,
                      weight: 'bold',
                    },
                    padding: {
                      bottom: isMobile ? 10 : 20,
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
              plugins: {
                annotation: {
                  annotations: {
                    referenceLine,
                  },
                  clip: true,
                },
                legend: {
                  display: false,
                },
                tooltip: tooltipConfig,
              },
            }}
            plugins={[whiteBackgroundPlugin]}
          />
        </div>
        {showLegend && (
          <ChartLegend
            chartRef={chart}
            items={legendItems}
            interactive={false}
            ariaLabel={ariaLabel}
            {...legend}
          />
        )}
      </div>
    </div>
  );
}

export default BaseScatter;
