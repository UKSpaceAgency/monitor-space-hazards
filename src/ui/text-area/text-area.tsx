import clsx from 'clsx';
import type { ReactNode, TextareaHTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';

import ErrorMessage from '../error-message/error-message';
import Hint from '../hint/hint';
import Label from '../label/label';

export type TextareaProps = {
  label?: ReactNode;
  labelClass?: string;
  hint?: ReactNode;
  error?: string;
  prefix?: string;
  suffix?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { name, className, label, hint, error, prefix, suffix, labelClass, required, 'aria-label': ariaLabel, ...props },
    ref,
  ) => {
    const id = useId();

    return (
      <div
        className={clsx('govuk-form-group', className, {
          'govuk-form-group--error': !!error,
        })}
      >
        {label && <Label htmlFor={id} className={labelClass}>{label}</Label>}
        {hint && <Hint>{hint}</Hint>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <textarea
          ref={ref}
          className={clsx('govuk-textarea whitespace-pre-wrap', {
            'govuk-textarea--error': !!error,
          })}
          id={id}
          rows={5}
          name={name}
          aria-label={`${ariaLabel} ${required ? 'required' : 'optional'} field`}
          {...props}
        />
      </div>
    );
  },
);

export default TextArea;
