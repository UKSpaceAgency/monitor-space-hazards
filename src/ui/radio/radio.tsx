import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useId } from 'react';

export type RadioProps = {
  hint?: ReactNode;
  conditional?: ReactNode;
  smaller?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      hint,
      conditional,
      smaller,
      className,
      children,
      checked,
      ...props
    }: RadioProps,
    ref,
  ) => {
    const id = useId();

    return (
      <>
        <div className={clsx('govuk-radios__item', className)}>
          <input
            ref={ref}
            className="govuk-radios__input"
            type="radio"
            id={props.id ?? id}
            checked={checked}
            {...props}
          />
          <label
            htmlFor={props.id ?? id}
            className={clsx('govuk-label', 'govuk-radios__label', 'max-w-max')}
          >
            {children}
          </label>
          {hint && <div className="govuk-hint govuk-radios__hint">{hint}</div>}
        </div>
        {conditional && checked && (
          <div
            className={clsx('govuk-radios__conditional', {
              'govuk-radios__conditional--hidden': !checked,
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
