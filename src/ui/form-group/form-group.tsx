import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

type FormGroupProps = {
  error?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export function FormGroup(props: FormGroupProps) {
  const { className, error, ...rest } = props;

  return (
    <div
      className={clsx(
        'govuk-form-group',
        { 'govuk-form-group--error': error },
        className,
      )}
      {...rest}
    />
  );
}

export default FormGroup;
