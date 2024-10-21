import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

export type CheckboxProps = {
  id?: string;
  hint?: ReactNode;
  children: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, hint, className, children, ...props }: CheckboxProps, ref) => {
    return (
      <div className={clsx('govuk-checkboxes__item', className)}>
        <input
          {...props}
          id={id}
          className="govuk-checkboxes__input"
          type="checkbox"
          ref={ref}
        />
        <label
          htmlFor={id}
          className="govuk-label govuk-checkboxes__label"
        >
          {children}
        </label>
        {hint && (
          <div className="govuk-hint govuk-checkboxes__hint">{hint}</div>
        )}
      </div>
    );
  },
);

export default Checkbox;
