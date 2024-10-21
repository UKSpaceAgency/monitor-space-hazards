/* eslint-disable react/no-array-index-key */
import clsx from 'clsx';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { useId } from 'react';

import ErrorMessage from '../error-message/error-message';
import Fieldset from '../fieldset/fieldset';
import FormGroup from '../form-group/form-group';
import Hint from '../hint/hint';
import Label from '../label/label';

type DateInputItem = {
  label?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export type DateInputProps = {
  items?: DateInputItem[];
  legend?: ReactNode;
  hint?: ReactNode;
  errors?: ReactNode | ReactNode[];
} & InputHTMLAttributes<HTMLInputElement>;

const defaultInputItems = [
  {
    name: 'day',
    className: 'govuk-input--width-2',
    label: 'Day',
  },
  {
    name: 'month',
    className: 'govuk-input--width-2',
    label: 'Month',
  },
  {
    name: 'year',
    className: 'govuk-input--width-4',
    type: 'text',
    label: 'Year',
  },
];

export function DateInput({
  items = defaultInputItems,
  onChange,
  className,
  legend,
  hint,
  errors,
}: DateInputProps) {
  const id = useId();

  return (
    <FormGroup error={!!errors} className={className}>
      <Fieldset
        legend={{
          text: legend,
          isPageHeading: true,
        }}
      >
        {hint && <Hint>{hint}</Hint>}
        {errors
          ? (
              Array.isArray(errors)
                ? (
                    errors.map((error, index) => (
                      <ErrorMessage key={index}>{error}</ErrorMessage>
                    ))
                  )
                : (
                    <ErrorMessage>{errors}</ErrorMessage>
                  )
            )
          : null}
        <div className="govuk-date-input">
          {items.map(({ label, className, ...props }, index) => (
            <div
              key={index}
              className={clsx('govuk-date-input__item')}
            >
              <div className="govuk-form-group">
                {label && (
                  <Label
                    className="govuk-date-input__label"
                    htmlFor={`${id}-${index}`}
                  >
                    {label}
                  </Label>
                )}
                <input
                  {...props}
                  id={`${id}-${index}`}
                  className={clsx(
                    'govuk-input',
                    'govuk-date-input__input',
                    className,
                  )}
                  onChange={onChange}
                  type="text"
                  inputMode={props.inputMode || 'numeric'}
                  pattern={props.pattern || '[0-9]*'}
                />
              </div>
            </div>
          ))}
        </div>
      </Fieldset>
    </FormGroup>
  );
}

export default DateInput;
