import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

export function InsetText({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('govuk-inset-text', className)}
      {...props}
    />
  );
}

export default InsetText;
