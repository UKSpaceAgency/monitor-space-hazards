import type { Chart as ChartJS, ChartDataset, ChartType } from 'chart.js';
import clsx from 'clsx';
import type { ChangeEvent, CSSProperties, MutableRefObject } from 'react';
import { useCallback, useEffect, useState } from 'react';

export type ChartLegendOptions = {
  interactive?: boolean;
  title?: string;
  ariaLabel?: string;
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
  ariaLabel,
}: ChartLegendProps) => {
  const [legendStatusMap, setLegendStatus] = useState<boolean[]>(Array(items.length).fill(true));

  useEffect(() => {
    setLegendStatus(Array(items.length).fill(true));
  }, [items]);

  const handleLegendClick = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    const index = Number.parseInt(target.value);
    setLegendStatus(state => state.map((v, i) => i === index ? !v : v));
    chartRef.current?.setDatasetVisibility(index, !chartRef.current?.isDatasetVisible(index));
    chartRef.current?.update();
  }, [chartRef]);

  return (
    <fieldset className="flex flex-col items-center justify-center gap-2 font-sans text-xs md:mx-2 md:text-base" aria-label={`${ariaLabel} Legend`} data-pdf-ignore>
      {title && <div><legend className="govuk-fieldset__legend text-xs md:text-xl m-0 p-1 font-bold text-nowrap ">{title}</legend></div>}
      <ul className="flex flex-wrap items-center m-0 p-0 gap-x-2 list-none justify-center">
        {items.map(({ label, backgroundColor, borderColor }, index) => {
          const checked = legendStatusMap[index];
          return (
          // eslint-disable-next-line react/no-array-index-key
            <li key={`${index}-${label}`} className="block" aria-label={`Show/hide ${ariaLabel} ${label} data`}>
              <label className={clsx('flex items-center gap-2 m-0 p-2 pointer-events-none', {
                'pointer-events-auto cursor-pointer': interactive,
              })}
              >
                <input
                  className="absolute opacity-0 cursor-pointer h-0 w-0 peer"
                  type="checkbox"
                  name={label}
                  value={index}
                  checked={checked}
                  onChange={handleLegendClick}
                />
                <span className="block flex-auto w-5 h-5 outline outline-2 outline-black rounded-[1px] border-[4px] peer-focus-visible:ring ring-[#fd0] ring-offset-2" style={{ borderColor } as CSSProperties}>
                  {checked && <span className="block w-full h-full" style={{ backgroundColor } as CSSProperties} />}
                </span>
                <span className="opacity-60 peer-checked:opacity-100">
                  {label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
};
