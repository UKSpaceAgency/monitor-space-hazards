import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

export type RadioProps = {
  hint?: ReactNode;
  conditional?: ReactNode;
  smaller?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      id,
      hint,
      conditional,
      smaller,
      className,
      children,
      ...props
    }: RadioProps,
    ref,
  ) => {
    return (
      <>
        <div className={clsx('govuk-radios__item', className)}>
          <input
            ref={ref}
            className="govuk-radios__input"
            type="radio"
            id={id}
            {...props}
          />
          <label
            htmlFor={id}
            className={clsx('govuk-label', 'govuk-radios__label')}
          >
            {children}
          </label>
          {hint && <div className="govuk-hint govuk-radios__hint">{hint}</div>}
        </div>
        {conditional && (
          <div
            className={clsx('govuk-radios__conditional', {
              'govuk-radios__conditional--hidden': !props.checked,
            })}
          >
            {conditional}
          </div>
        )}
      </>
    );
  },
);

export default Radio;
