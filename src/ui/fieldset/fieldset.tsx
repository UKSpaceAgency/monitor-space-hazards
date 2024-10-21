import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

import styles from './fieldset.module.scss';

type FieldsetProps = {
  legend?: {
    text: ReactNode;
    isPageHeading?: boolean;
    size?: 's' | 'm' | 'l' | 'xl';
  };
} & HTMLAttributes<HTMLFieldSetElement>;

export function Fieldset({
  legend,
  className,
  children,
  ...rest
}: FieldsetProps) {
  return (
    <fieldset
      className={clsx('govuk-fieldset', className)}
      {...rest}
    >
      {legend && (
        <legend
          className={clsx(
            'govuk-fieldset__legend',
            `govuk-fieldset__legend--${legend.size ?? 'l'}`,
          )}
        >
          {legend.isPageHeading
            ? (
                <h1 className={clsx(styles['govuk-fieldset__heading'])}>
                  {legend.text}
                </h1>
              )
            : (
                legend.text
              )}
        </legend>
      )}
      {children}
    </fieldset>
  );
}

export default Fieldset;
