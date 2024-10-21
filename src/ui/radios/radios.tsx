import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';

import Radio from '../radio/radio';

type RadioItem = {
  label?: ReactNode;
  hint?: ReactNode;
  conditional?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export type RadioProps = {
  items: RadioItem[];
  name: string;
  inline?: true;
  small?: true;
};

export function Radios({ name, items, inline, small }: RadioProps) {
  return (
    <div
      className={clsx('govuk-radios', {
        'govuk-radios--small': small,
        'govuk-radios--inline': inline,
      })}
    >
      {items.map((radio, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Radio key={index} {...radio} name={name} />
      ))}
    </div>
  );
}

export default Radios;
