import styles from './tooltip.module.scss';

export type TooltipProps = {
  label: string;
  children: React.ReactElement | string;
};

export function Tooltip({ label, children }: TooltipProps) {
  return (
    <abbr
      className={styles.root}
      role="tooltip"
      data-module="tooltip"
      aria-label={label}
    >
      {children}
      <span className={styles.tooltip}>{label}</span>
    </abbr>
  );
}

export default Tooltip;
