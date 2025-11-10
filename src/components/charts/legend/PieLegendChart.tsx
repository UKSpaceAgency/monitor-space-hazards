import type { Chart as ChartJS, ChartType } from 'chart.js';
import clsx from 'clsx';
import type { ChangeEvent, CSSProperties, MutableRefObject } from 'react';
import { useCallback, useState } from 'react';

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
        {legendItems.map((label, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`${index}-${label}`} className="block" aria-label={`Show/hide ${ariaLabel} ${label} data`}>
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
              <span className="block w-5 h-5 border-[1px] border-solid opacity-50 peer-checked/legend:opacity-100 peer-focus-visible/legend:border-4 peer-focus-visible/legend:shadow-[0_0_0_3px_#fd0]" style={{ backgroundColor: legendColors[index], borderColor: legendColors[index] } as CSSProperties} />
              <span className="line-through peer-checked/legend:no-underline">
                {label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};
