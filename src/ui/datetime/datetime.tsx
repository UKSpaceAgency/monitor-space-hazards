import clsx from 'clsx';
import { isEmpty, pick } from 'lodash';
import type { SyntheticEvent } from 'react';
import { Fragment, useMemo, useState } from 'react';
import { z } from 'zod';

import DateInput from '../date-input/date-input';

const dateSchema = z.object({
  day: z.number({
    invalid_type_error: 'Day is required',
  }).min(1).max(31),
  month: z.number({
    invalid_type_error: 'Month is required',
  }).min(1).max(12),
  year: z.number({
    invalid_type_error: 'Year is required',
  }),
  hour: z.number({
    invalid_type_error: 'Hour is required',
  }).min(1).max(24),
  minute: z.number({
    invalid_type_error: 'Minute is required',
  }).min(0).max(59),
});

export type DateSchema = z.infer<typeof dateSchema>;

type DateState = {
  day: number | null;
  month: number | null;
  year: number | null;
  hour: number | null;
  minute: number | null;
};

type ErrorState = Partial<DateState>;

export type DatetimeInputProps = {
  dateLabel: string;
  timeLabel: string;
  onChange: (value: string) => void;
  value: string;
};

export function DatetimeInput({
  dateLabel,
  timeLabel,
  onChange,
  value,
}: DatetimeInputProps) {
  const date = useMemo(() => {
    const initialDate = new Date(value);
    return {
      day: initialDate.getDate(),
      month: (initialDate.getMonth() + 1),
      year: initialDate.getFullYear(),
      hour: initialDate.getHours(),
      minute: initialDate.getMinutes(),
    };
  }, [value]);

  const [errors, setErrors] = useState<ErrorState>({});

  const validateData = async (date: DateSchema) => {
    setErrors({});
    try {
      dateSchema.parse(date);
      const newDate = new Date(
        date.year,
        date.month - 1,
        date.day,
        date.hour,
        date.minute,
      );
      return newDate.toJSON();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        for (const issue of error.issues) {
          const path = issue.path[0];
          if (path && typeof path === 'string') {
            errors[path] = issue.message;
          }
        }
        setErrors(errors);
      } else {
        console.error('Unexpected error: ', error);
      }
    }
  };

  const onChangeHandler = async (e: SyntheticEvent<HTMLInputElement>) => {
    const copyDate = { ...date };
    const name = e.currentTarget.name as keyof DateState;
    const value = e.currentTarget.value;

    copyDate[name] = Number.parseInt(value);

    const newDate = await validateData(copyDate);
    if (newDate) {
      onChange(newDate);
    }
  };

  const dateErrors = pick(errors, ['day', 'month', 'year']);
  const timeErrors = pick(errors, ['hour', 'minute']);

  return (
    <>
      <DateInput
        errors={
          !isEmpty(dateErrors)
            ? Object.keys(dateErrors).map(key => (
              <Fragment key={`error-${key}`}>
                {errors[key as keyof ErrorState]}
                <br />
              </Fragment>
            ))
            : null
        }
        legend={<b>{dateLabel}</b>}
        hint="For example, 31 3 1980"
        items={[
          {
            className: clsx('govuk-input--width-2', {
              'govuk-input--error': errors?.day,
            }),
            name: 'day',
            type: 'number',
            defaultValue: date.day || '',
            label: 'Day',
          },
          {
            className: clsx('govuk-input--width-2', {
              'govuk-input--error': errors?.month,
            }),
            name: 'month',
            defaultValue: date.month || '',
            label: 'Month',
          },
          {
            className: clsx('govuk-input--width-4', {
              'govuk-input--error': errors?.year,
            }),
            name: 'year',
            defaultValue: date.year || '',
            label: 'Year',
          },
        ]}
        onChange={onChangeHandler}
      />
      <DateInput
        errors={
          !isEmpty(timeErrors)
            ? Object.keys(timeErrors).map(key => (
              <Fragment key={`error-${key}`}>
                {errors[key as keyof ErrorState]}
                <br />
              </Fragment>
            ))
            : null
        }
        legend={<b>{timeLabel}</b>}
        hint="For example, 08:10"
        items={[
          {
            className: clsx('govuk-input--width-2', {
              'govuk-input--error': errors?.hour,
            }),
            name: 'hour',
            defaultValue: date.hour || '',
            label: 'Hour',
          },
          {
            className: clsx('govuk-input--width-2', {
              'govuk-input--error': errors?.minute,
            }),
            name: 'minute',
            defaultValue: date.minute !== null ? date.minute : '',
            label: 'Minute',
          },
        ]}
        onChange={onChangeHandler}
      />
    </>
  );
}

export default DatetimeInput;
