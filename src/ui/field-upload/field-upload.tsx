import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { forwardRef, useId } from 'react';

import ErrorMessage from '../error-message/error-message';
import FormGroup from '../form-group/form-group';
import Hint from '../hint/hint';
import Label from '../label/label';

export type FieldUploadProps = {
  label?: string;
  hint?: ReactNode;
  error?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const FieldUpload = forwardRef<HTMLInputElement, FieldUploadProps>(
  (props: FieldUploadProps, ref) => {
    const id = useId();
    const { className, hint, error, label, ...rest } = props;

    return (
      <FormGroup error={!!error} className={className}>
        {label && <Label htmlFor={id}>{label}</Label>}
        {hint && <Hint>{hint}</Hint>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <input
          {...rest}
          id={id}
          ref={ref}
          className={clsx('govuk-file-upload', {
            'govuk-file-upload--error': !!error,
          })}
          type="file"
        />
      </FormGroup>
    );
  },
);

export default FieldUpload;
