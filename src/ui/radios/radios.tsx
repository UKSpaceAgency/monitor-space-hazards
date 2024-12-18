import clsx from 'clsx';
import { type HTMLAttributes, type InputHTMLAttributes, type ReactNode, useId } from 'react';

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
  name?: string;
  hint?: ReactNode;
  error?: string;
  inline?: true;
  small?: true;
} & HTMLAttributes<HTMLDivElement>;

export function Radios({ items, label, hint, error, inline, small, labelClass, className }: RadiosProps) {
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
          <Radio key={index} {...radio} />
        ))}
      </div>
    </div>
  );
}

export default Radios;
