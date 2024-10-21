import clsx from 'clsx';
import type { ReactNode, TextareaHTMLAttributes } from 'react';
import { forwardRef, useId } from 'react';

import ErrorMessage from '../error-message/error-message';
import Hint from '../hint/hint';
import Label from '../label/label';

export type TextareaProps = {
  label?: ReactNode;
  hint?: ReactNode;
  error?: string;
  prefix?: string;
  suffix?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { name, className, label, hint, error, prefix, suffix, ...props },
    ref,
  ) => {
    const id = useId();

    return (
      <div
        className={clsx('govuk-form-group', {
          'govuk-form-group--error': !!error,
        })}
      >
        {label && <Label htmlFor={id}>{label}</Label>}
        {hint && <Hint>{hint}</Hint>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <textarea
          ref={ref}
          className={clsx('govuk-textarea', {
            'govuk-textarea--error': !!error,
          })}
          id={id}
          rows={5}
          name={name}
          {...props}
        />
      </div>
    );
  },
);

export default TextArea;
