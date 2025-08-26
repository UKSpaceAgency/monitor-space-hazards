import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useId } from 'react';

export type CheckboxProps = {
  id?: string;
  hint?: ReactNode;
  full?: boolean;
  conditional?: ReactNode;
  children: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ hint, full, conditional, className, children, ...props }: CheckboxProps, ref) => {
    const id = useId();
    return (
      <div className={clsx('govuk-checkboxes__item', className)}>
        <input
          {...props}
          id={`${props.id ?? id}-cb`}
          aria-describedby={props.id ?? id}
          className="govuk-checkboxes__input"
          type="checkbox"
          ref={ref}
        />
        <label
          htmlFor={id}
          className={clsx('govuk-label govuk-checkboxes__label', {
            'w-full': full,
          })}
        >
          {children}
        </label>
        {hint && (
          <div className="govuk-hint govuk-checkboxes__hint">{hint}</div>
        )}
        {conditional && (
          <div
            className={clsx('govuk-checkboxes__conditional')}
          >
            {conditional}
          </div>
        )}
      </div>
    );
  },
);

export default Checkbox;
