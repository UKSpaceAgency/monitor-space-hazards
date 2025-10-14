import clsx from 'clsx';
import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

import ErrorMessage from '../error-message/error-message';
import Hint from '../hint/hint';
import Radio from '../radio/radio';

type RadioItem = {
  label?: ReactNode;
  hint?: ReactNode;
  conditional?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export type RadiosProps = {
  items: RadioItem[];
  legend?: ReactNode;
  legendClass?: string;
  value?: string;
  name?: string;
  hint?: string;
  error?: string;
  inline?: true;
  small?: true;
  required?: true;
} & Omit<HTMLAttributes<HTMLDivElement>, 'defaultChecked'>;

export function Radios({ items, legend, value, hint, error, inline, small, legendClass, className, id, required, 'aria-label': ariaLabel, onChange }: RadiosProps) {
  return (
    <fieldset
      aria-label={`${ariaLabel} ${required ? 'required' : 'optional'} field`}
      className={clsx(
        'govuk-form-group',
        { 'govuk-form-group--error': !!error },
        className,
      )}
    >
      {legend && <legend className={clsx('govuk-fieldset__legend govuk-fieldset__legend--s', legendClass)}><b>{legend}</b></legend>}
      {hint && <Hint id={hint}>{hint}</Hint>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div
        id={id}
        className={clsx('govuk-radios', {
          'govuk-radios--small': small,
          'govuk-radios--inline': inline,
        })}
      >
        {items.map((radio, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Radio key={index} checked={value ? radio.value === value : radio.checked} onChange={onChange} {...radio} />
        ))}
      </div>
    </fieldset>
  );
}

export default Radios;
