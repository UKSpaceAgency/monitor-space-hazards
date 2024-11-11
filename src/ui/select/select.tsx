import clsx from 'clsx';
import type {
  OptionHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from 'react';
import {
  forwardRef,
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

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  options,
  className,
  label,
  hint,
  error,
  ...props
}, ref) => {
  const id = useId();

  return (
    <div
      className={clsx(
        'govuk-form-group',
        { 'govuk-form-group--error': !!error },
        className,
      )}
    >
      {label && <Label htmlFor={id}><b>{label}</b></Label>}
      {hint && <Hint>{hint}</Hint>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="govuk-input__wrapper">
        <select
          id={id}
          ref={ref}
          className={clsx('govuk-select govuk-!-width-full', {
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

    </div>
  );
});

export default Select;
