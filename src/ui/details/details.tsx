import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

type DetailsProps = {
  summary?: string;
} & HTMLAttributes<HTMLDetailsElement>;

export function Details(props: DetailsProps) {
  const { summary = 'Help', className, children, ...rest } = props;
  return (
    <details
      className={clsx('govuk-details', className)}
      {...rest}
    >
      <summary className="govuk-details__summary">
        <span className="govuk-details__summary-text">{summary}</span>
      </summary>
      <div className="govuk-details__text">{children}</div>
    </details>
  );
}

export default Details;
