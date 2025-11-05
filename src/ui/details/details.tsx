import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

type DetailsProps = {
  summary?: string;
  initiallyOpen?: boolean;
  ariaLabel?: string;
} & HTMLAttributes<HTMLDetailsElement>;

export function Details(props: DetailsProps) {
  const { summary = 'Help', className, children, id, initiallyOpen, ariaLabel, ...rest } = props;

  return (
    <details
      className={clsx('govuk-details', className)}
      open={initiallyOpen}
      {...rest}
    >
      <summary id={id} className="govuk-details__summary" aria-label={ariaLabel}>
        <span className="govuk-details__summary-text">{summary}</span>
      </summary>
      <div className="govuk-details__text">{children}</div>
    </details>
  );
}

export default Details;
