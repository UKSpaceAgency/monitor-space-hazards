import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

type DetailsProps = {
  summary?: ReactNode;
  initiallyOpen?: boolean;
  summaryAriaLabel?: string;
} & HTMLAttributes<HTMLDetailsElement>;

export function Details(props: DetailsProps) {
  const { summary = 'Help', className, children, id, initiallyOpen, summaryAriaLabel, ...rest } = props;

  return (
    <details
      className={clsx('govuk-details', className)}
      open={initiallyOpen}
      {...rest}
    >
      <summary id={id} className="govuk-details__summary" aria-label={summaryAriaLabel}>
        <span className="govuk-details__summary-text">{summary}</span>
      </summary>
      <div className="govuk-details__text">{children}</div>
    </details>
  );
}

export default Details;
