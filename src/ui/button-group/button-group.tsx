import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

export function ButtonGroup({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('govuk-button-group', 'items-start', className)}
      {...rest}
    />
  );
}

export default ButtonGroup;
