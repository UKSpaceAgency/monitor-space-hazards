import clsx from 'clsx';
import type {
  OptionHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react';
import {
  useId,
} from 'react';

import ErrorMessage from '../error-message/error-message';
import Hint from '../hint/hint';
import Label from '../label/label';

export type SelectProps = {
  options: OptionHTMLAttributes<HTMLOptionElement>[];
  className?: string;
  label?: ReactNode;
  hint?: ReactNode;
  error?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export function Select({
  options,
  className,
  label,
  hint,
  error,
  ...props
}: SelectProps) {
  const id = useId();

  return (
    <div
      className={clsx(
        'govuk-form-group',
        { 'govuk-form-group--error': !!error },
        className,
      )}
    >
      {label && <Label htmlFor={id}>{label}</Label>}
      {hint && <Hint>{hint}</Hint>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <select
        className={clsx('govuk-select', {
          'govuk-select--error': !!error,
        })}
        {...props}
      >
        {options.map((option, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <option key={index} {...option} />
        ))}
      </select>
    </div>
  );
}

export default Select;
