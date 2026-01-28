import type { Chart as ChartJS, ChartType } from 'chart.js';
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
  legendItems: string[];
  legendColors: string[];
} & ChartLegendOptions;

export type InferChartLegendProps = {
  legend?: ChartLegendOptions;
  showLegend?: boolean;
};

export const PieChartLegend = ({
  chartRef,
  interactive = true,
  legendItems,
  legendColors,
  title,
  ariaLabel,
}: ChartLegendProps) => {
  const [legendStatusMap, setLegendStatus] = useState<boolean[]>(Array(legendItems.length).fill(true));

  useEffect(() => {
    if (legendStatusMap.length !== legendItems.length) {
      setLegendStatus(Array(legendItems.length).fill(true));
    }
  }, [legendItems, legendStatusMap.length]);

  const handleLegendClick = useCallback(({ target }: ChangeEvent<HTMLInputElement>) => {
    const index = Number.parseInt(target.value);
    if (chartRef.current) {
      chartRef.current.toggleDataVisibility(index);
      const isVisible = chartRef.current.getDataVisibility(index);
      setLegendStatus(state => state.map((v, i) => i === index ? isVisible : v));
      chartRef.current.update();
    }
  }, [chartRef]);

  return (
    <fieldset className="font-sans text-xs md:mx-2 md:text-base" aria-label={`${ariaLabel} Legend`} data-pdf-ignore>
      {title && <div><legend className="govuk-fieldset__legend text-xs md:text-xl m-0 p-1 font-bold text-nowrap ">{title}</legend></div>}
      <ul className="list-none">
        {legendItems.map((label, index) => {
          const checked = legendStatusMap[index] ?? true;
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
                <span className="relative block w-5 h-5 outline outline-2 peer-focus-visible:outline-[4px] outline-black rounded-[1px] border-[4px] peer-focus-visible:ring-4 ring-[#fd0] ring-offset-[3px]" style={{ borderColor: legendColors[index] } as CSSProperties}>
                  {checked ? <span className="block w-full h-full" style={{ backgroundColor: legendColors[index] } as CSSProperties} /> : <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-[2px] border-t border-l-0 border-r-0 border-b rotate-45 border-transparent" style={{ backgroundColor: legendColors[index] } as CSSProperties} />}
                </span>
                <span className="opacity-60 peer-checked:opacity-100 peer-checked:no-underline">
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
