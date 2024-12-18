import clsx from 'clsx';
import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { useId } from 'react';

import ErrorMessage from '../error-message/error-message';
import Hint from '../hint/hint';
import Label from '../label/label';
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
  hint?: ReactNode;
  error?: string;
  inline?: true;
  small?: true;
} & Omit<HTMLAttributes<HTMLDivElement>, 'defaultChecked'>;

export function Radios({ items, label, value, hint, error, inline, small, labelClass, className, onChange }: RadiosProps) {
  const id = useId();

  return (
    <div
      className={clsx(
        'govuk-form-group',
        { 'govuk-form-group--error': !!error },
        className,
      )}
    >
      {label && <Label className={labelClass} htmlFor={id}><b>{label}</b></Label>}
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
          <Radio key={index} checked={radio.value === value} onChange={onChange} {...radio} />
        ))}
      </div>
    </div>
  );
}

export default Radios;
