import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

export type TagProps = {
  color?:
    | 'grey'
    | 'purple'
    | 'turquoise'
    | 'blue'
    | 'light-blue'
    | 'yellow'
    | 'orange'
    | 'red'
    | 'pink'
    | 'green';
} & HTMLAttributes<HTMLDivElement>;

export function Tag({ className, color, ...props }: TagProps) {
  return (
    <strong
      className={clsx('govuk-tag', className, {
        [`govuk-tag--${color as string}`]: color,
      })}
      {...props}
    />
  );
}

export default Tag;
