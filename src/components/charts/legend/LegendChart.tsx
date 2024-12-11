import type { Chart as ChartJS, ChartDataset, ChartType } from 'chart.js';
import type { ChangeEvent, CSSProperties, MutableRefObject } from 'react';
import { useCallback, useState } from 'react';

import styles from './chart-legend.module.scss';

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
    <div className={styles.legend} data-pdf-ignore>
      {title && <p className={styles.legend__title}>{title}</p>}
      <ul className={styles.legend__list}>
        {items.map(({ label, backgroundColor, borderColor }, index) => (
          <li key={`${index}-${label}`} className={styles.legend__item}>
            <label className={`${styles.legend__label} ${styles[interactive ? 'legend__label--interactive' : '']}`}>
              <input
                className={styles.legend__input}
                type="checkbox"
                name={label}
                value={index}
                checked={legendStatusMap[index]}
                onChange={handleLegendClick}
              />
              <span className={styles.legend__shape} style={{ backgroundColor, borderColor } as CSSProperties} />
              <span className={styles.legend__text}>
                {label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
