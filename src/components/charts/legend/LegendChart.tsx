import type { Chart as ChartJS, ChartDataset, ChartType } from 'chart.js';
import clsx from 'clsx';
import type { ChangeEvent, CSSProperties, MutableRefObject } from 'react';
import { useCallback, useState } from 'react';

export type ChartLegendOptions = {
  interactive?: boolean;
  title?: string;
};

export type ChartLegendProps = {
  chartRef: MutableRefObject<ChartJS<ChartType> | undefined>;
  items: ChartDataset<ChartType>[];
} & ChartLegendOptions;

export type InferChartLegendProps = {
  legend?: ChartLegendOptions;
  showLegend?: boolean;
};

export const ChartLegend = ({
  chartRef,
  interactive = true,
  items,
  title,
}: ChartLegendProps) => {
  const [legendStatusMap, setLegendStatus] = useState<boolean[]>(Array(items.length).fill(true));

  const handleLegendClick = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    const index = Number.parseInt(target.value);
    setLegendStatus(state => state.map((v, i) => i === index ? !v : v));
    chartRef.current?.setDatasetVisibility(index, !chartRef.current?.isDatasetVisible(index));
    chartRef.current?.update();
  }, [chartRef]);

  return (
    <div className="flex items-start justify-center gap-2 font-sans text-xs md:mx-2 md:text-base" data-pdf-ignore>
      {title && <p className="m-0 p-1 font-bold text-nowrap">{title}</p>}
      <ul className="flex flex-wrap items-center m-0 p-0 gap-x-2 list-none justify-center">
        {items.map(({ label, backgroundColor, borderColor }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`${index}-${label}`} className="block">
            <label className={clsx('flex items-center gap-1 m-0 p-1 pointer-events-none', {
              'pointer-events-auto cursor-pointer': interactive,
            })}
            >
              <input
                className="absolute opacity-0 cursor-pointer h-0 w-0 peer/legend"
                type="checkbox"
                name={label}
                value={index}
                checked={legendStatusMap[index]}
                onChange={handleLegendClick}
              />
              <span className="block flex-auto w-4 h-5 border-[1px] border-solid opacity-50 peer-checked/legend:opacity-100" style={{ backgroundColor, borderColor } as CSSProperties} />
              <span className=" line-through peer-checked/legend:no-underline">
                {label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
