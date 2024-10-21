import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import styles from './form-group.module.scss';

type FormGroupProps = {
  error?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function FormGroup(props: FormGroupProps) {
  const { className, error, ...rest } = props;

  return (
    <div
      className={clsx(
        styles['govuk-form-group'],
        { 'govuk-form-group--error': error },
        className,
      )}
      {...rest}
    />
  );
}

export default FormGroup;
