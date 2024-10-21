import clsx from 'clsx';
import { isEmpty, pick } from 'lodash';
import type { SyntheticEvent } from 'react';
import { Fragment, useEffect, useState } from 'react';
import { z } from 'zod';

import DateInput from '../date-input/date-input';

const schema = z.object({
  day: z.string({
    required_error: 'Day is required',
  }),
  month: z.string({
    required_error: 'Month is required',

  }),
  year: z.string({
    required_error: 'Year is required',

  }),
  hour: z.string({
    required_error: 'Hour is required',

  }),
  minute: z.string({
    required_error: 'Minute is required',
  }),
});

type DateState = {
  day: string | null;
  month: string | null;
  year: string | null;
  hour: string | null;
  minute: string | null;
};

type ErrorState = Partial<DateState>;

export type DatetimeInputProps = {
  dateLabel: string;
  timeLabel: string;
  onChange: (value: Date | null) => void;
  defaultValue: Date;
};

export function DatetimeInput({
  dateLabel,
  timeLabel,
  onChange,
  defaultValue,
}: DatetimeInputProps) {
  const [date, setDate] = useState<DateState>({
    day: defaultValue.getDate().toString(),
    month: (defaultValue.getMonth() + 1).toString(),
    year: defaultValue.getFullYear().toString(),
    hour: defaultValue.getHours().toString(),
    minute:
      defaultValue.getMinutes() < 10
        ? `0${defaultValue.getMinutes()}`
        : defaultValue.getMinutes().toString(),
  });
  const [errors, setErrors] = useState<ErrorState>({});

  const onChangeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    const newDate = { ...date };
    const name = e.currentTarget.name as keyof DateState;
    const value = e.currentTarget.value;

    newDate[name] = value;

    setDate(newDate);
  };

  useEffect(() => {
    const validateData = async () => {
      setErrors({});
      try {
        await schema.parseAsync(date);
        const newDate = new Date(
          Number.parseInt(date.year as string),
          Number.parseInt(date.month as string) - 1,
          Number.parseInt(date.day as string),
          Number.parseInt(date.hour as string),
          Number.parseInt(date.minute as string),
        );
        onChange(newDate);
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
    validateData();
  }, [date, onChange]);

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
            value: date.day || '',
            label: 'Day',
          },
          {
            className: clsx('govuk-input--width-2', {
              'govuk-input--error': errors?.month,
            }),
            name: 'month',
            value: date.month || '',
            label: 'Month',
          },
          {
            className: clsx('govuk-input--width-4', {
              'govuk-input--error': errors?.year,
            }),
            name: 'year',
            value: date.year || '',
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
            value: date.hour || '',
            label: 'Hour',
          },
          {
            className: clsx('govuk-input--width-2', {
              'govuk-input--error': errors?.minute,
            }),
            name: 'minute',
            value: date.minute !== null ? date.minute : '',
            label: 'Minute',
          },
        ]}
        onChange={onChangeHandler}
      />
    </>
  );
}

export default DatetimeInput;
