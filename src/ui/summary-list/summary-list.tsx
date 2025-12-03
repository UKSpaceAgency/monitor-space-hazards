import clsx from 'clsx';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Row = {
  key: {
    className?: string;
    children: ReactNode;
  };
  value: {
    className?: string;
    children: ReactNode;
  };
  actions?: (LinkProps & { 'aria-label'?: string; 'children': ReactNode })[];
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
          <dt className={clsx('govuk-summary-list__key', key.className)}>{key.children}</dt>
          <dd className={clsx('govuk-summary-list__value', value.className)}>{value.children}</dd>
          {actions && (
            <ul className="govuk-summary-list__actions-list flex justify-end">
              {actions?.map((action, index) => (
                <li
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="govuk-summary-list__actions-list-item"
                >
                  <Link aria-label={action['aria-label']} className="govuk-link" {...action} />
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
