import clsx from 'clsx';
import { type HTMLAttributes, type ReactNode, useEffect, useRef } from 'react';

type ErrorSummaryProps = {
  title?: ReactNode;
  errorList: {
    href?: string;
    children: string;
  }[];
  description?: ReactNode;
  disableAutoFocus?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

export function ErrorSummary(props: ErrorSummaryProps) {
  const firstAnchorRef = useRef<HTMLAnchorElement>(null);

  const {
    title = 'There is a problem',
    description,
    errorList,
    disableAutoFocus,
    className,
    ...rest
  } = props;

  useEffect(() => {
    firstAnchorRef.current?.focus();
  }, []);

  return (
    <div
      className={clsx('govuk-error-summary', className)}
      {...rest}
    >
      <div role="alert">
        {title && <h2 className="govuk-error-summary__title">{title}</h2>}
        <div className="govuk-error-summary__body">
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
                {href ? <a href={href} ref={index === 0 ? firstAnchorRef : null}>{children}</a> : children}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ErrorSummary;
