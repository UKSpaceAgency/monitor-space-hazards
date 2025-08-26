import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useId } from 'react';

import ErrorMessage from '../error-message/error-message';
import Hint from '../hint/hint';
import Label from '../label/label';

export type InputProps = {
  label?: ReactNode;
  hint?: ReactNode;
  error?: string;
  prefix?: string;
  suffix?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>((
  { name, className, label, hint, error, prefix, suffix, required, 'aria-label': ariaLabel, ...props },
  ref,
) => {
  const id = useId();

  return (
    <div
      className={clsx(
        'govuk-form-group',
        { 'govuk-form-group--error': !!error },
        className,
      )}
    >
      {label && (
        <Label htmlFor={props.id ?? id}><b>{label}</b></Label>
      )}
      {hint && <Hint>{hint}</Hint>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="govuk-input__wrapper">
        {prefix && (
          <div className="govuk-input__prefix" aria-hidden="true">
            {prefix}
          </div>
        )}
        <input
          {...props}
          className={clsx('govuk-input placeholder-darkGrey', {
            'govuk-input--error': !!error,
          })}
          id={props.id ?? id}
          aria-label={`${ariaLabel} ${required ? 'required' : 'optional'} field`}
          aria-describedby={props.id ?? id}
          name={name}
          ref={ref}
        />
        {suffix && (
          <div className="govuk-input__suffix" aria-hidden="true">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
});

export default Input;
