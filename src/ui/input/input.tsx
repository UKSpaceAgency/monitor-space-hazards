import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useId } from 'react';

import ErrorMessage from '../error-message/error-message';
import Hint from '../hint/hint';
import Label from '../label/label';
import styles from './input.module.scss';

export type InputProps = {
  label?: ReactNode;
  hint?: ReactNode;
  error?: string;
  prefix?: string;
  suffix?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>((
  { name, className, label, hint, error, prefix, suffix, ...props },
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
      {label && <Label htmlFor={id}>{label}</Label>}
      {hint && <Hint>{hint}</Hint>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className={styles['govuk-input__wrapper']}>
        {prefix && (
          <div className={styles['govuk-input__prefix']} aria-hidden="true">
            {prefix}
          </div>
        )}
        <input
          {...props}
          className={clsx('govuk-input', {
            'govuk-input--error': !!error,
          })}
          id={id}
          name={name}
          ref={ref}
        />
        {suffix && (
          <div className={styles['govuk-input__suffix']} aria-hidden="true">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
});

export default Input;
