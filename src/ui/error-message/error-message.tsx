import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

type ErrorMessageProps = {
  visuallyHiddenText?: string;
} & HTMLAttributes<HTMLParagraphElement>;

export function ErrorMessage(props: ErrorMessageProps) {
  const { className, children, visuallyHiddenText = 'Error', ...rest } = props;

  return (
    <p
      className={clsx('govuk-error-message', className)}
      {...rest}
    >
      <span className="govuk-visually-hidden">
        {visuallyHiddenText}
        :
      </span>
      {children}
    </p>
  );
}

export default ErrorMessage;
