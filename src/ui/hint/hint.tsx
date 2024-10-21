import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

export function Hint({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={clsx('govuk-hint', className)} {...props} />
  );
}

export default Hint;
