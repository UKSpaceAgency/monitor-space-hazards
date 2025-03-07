import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';

import type { CheckboxProps } from '../checkbox/checkbox';
import { Checkbox } from '../checkbox/checkbox';
import ErrorMessage from '../error-message/error-message';

export type CheckboxesProps = {
  items: CheckboxProps[];
  legend?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  smaller?: boolean;
  inline?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export function Checkboxes({
  items,
  className,
  legend,
  hint,
  error,
  smaller,
  inline,
  children,
  ...rest
}: CheckboxesProps) {
  return (
    <div className={clsx('govuk-form-group', className)}>
      <fieldset className="govuk-fieldset" aria-describedby="nationality-hint">
        {legend && (
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h2 className="govuk-fieldset__heading">{legend}</h2>
          </legend>
        )}
        {children}
        {hint && <div className="govuk-hint">{hint}</div>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div
          className={clsx('govuk-checkboxes', {
            'govuk-checkboxes--small': smaller,
            'flex grow gap-4': inline,
          })}
        >
          {items.map((checkbox, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Checkbox key={index} {...rest} className="grow" {...checkbox} />
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default Checkboxes;
