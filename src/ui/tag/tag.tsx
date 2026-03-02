import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

export type TagColor = 'grey' | 'green' | 'teal' | 'blue' | 'purple' | 'magenta' | 'red' | 'orange' | 'yellow';

export type TagProps = {
  color?: TagColor;
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
