import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './error-summary.module.scss';

type ErrorSummaryProps = {
  title: ReactNode;
  errorList: {
    href?: string;
    children: string;
  }[];
  description?: ReactNode;
  disableAutoFocus?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export function ErrorSummary(props: ErrorSummaryProps) {
  const {
    title,
    description,
    errorList,
    disableAutoFocus,
    className,
    ...rest
  } = props;

  return (
    <div
      className={clsx('govuk-error-summary', className)}
      {...rest}
    >
      <div role="alert">
        <h2 className={styles['govuk-error-summary__title']}>{title}</h2>
        <div className={styles['govuk-error-summary__body']}>
          {description && <p>{description}</p>}
          <ul
            className={clsx(
              'govuk-list',
              'govuk-error-summary__list',
            )}
          >
            {errorList.map(({ href, children }, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={index}>
                {href ? <a href={href}>{children}</a> : children}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ErrorSummary;
