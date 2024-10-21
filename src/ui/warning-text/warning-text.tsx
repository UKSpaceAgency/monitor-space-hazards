import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

export function WarningText({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx('govuk-warning-text', className)}
      {...props}
    >
      <span className="govuk-warning-text__icon" aria-hidden="true">
        !
      </span>
      <strong className="govuk-warning-text__text">
        <span className="govuk-visually-hidden">Warning</span>
        {children}
      </strong>
    </div>
  );
}

export default WarningText;
