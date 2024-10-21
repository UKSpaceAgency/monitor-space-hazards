import clsx from 'clsx';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Row = {
  key: ReactNode;
  value: ReactNode;
  actions?: LinkProps[];
};

type SummaryListProps = {
  rows: Row[];
  className?: string;
};

export function SummaryList({ className, rows }: SummaryListProps) {
  return (
    <dl className={clsx('govuk-summary-list', className)}>
      {rows.map(({ key, value, actions }, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          className="govuk-summary-list__row"
        >
          <dt className="govuk-summary-list__key">{key}</dt>
          <dd className="govuk-summary-list__value">{value}</dd>
          {actions && (
            <ul className="govuk-summary-list__actions-list">
              {actions?.map((action, index) => (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="govuk-summary-list__actions-list-item"
                >
                  <Link {...action} />
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </dl>
  );
}

export default SummaryList;
