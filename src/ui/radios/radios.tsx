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
  label?: ReactNode;
  labelClass?: string;
  value?: string;
  name?: string;
  hint?: ReactNode;
  error?: string;
  inline?: true;
  small?: true;
} & Omit<HTMLAttributes<HTMLDivElement>, 'defaultChecked'>;

export function Radios({ items, label, value, hint, error, inline, small, labelClass, className, onChange }: RadiosProps) {
  return (
    <fieldset
      className={clsx(
        'govuk-form-group',
        { 'govuk-form-group--error': !!error },
        className,
      )}
    >
      {label && <legend className={clsx('govuk-fieldset__legend govuk-fieldset__legend--s', labelClass)}><b>{label}</b></legend>}
      {hint && <Hint>{hint}</Hint>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div
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
