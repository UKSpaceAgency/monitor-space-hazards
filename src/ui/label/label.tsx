import clsx from 'clsx';
import type { LabelHTMLAttributes } from 'react';

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  const { className, ...rest } = props;
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label className={clsx('govuk-label', className)} {...rest} />
  );
}

export default Label;
