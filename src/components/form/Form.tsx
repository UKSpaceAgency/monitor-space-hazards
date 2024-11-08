'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import type {
  DefaultValues,
} from 'react-hook-form';
import {
  FormProvider,
  useForm,
} from 'react-hook-form';
import type { z } from 'zod';

import ErrorSummary from '@/ui/error-summary/error-summary';

export type FormProps<T extends object> = {
  defaultValues?: DefaultValues<T>;
  schema?: z.Schema<DefaultValues<T>>;
  isSubmitting?: boolean;
  action: (values: T) => Promise<unknown>;
  errors?: {
    [key: string]: unknown;
  };
  children: ReactNode;
};

const Form = <T extends object>({
  defaultValues,
  schema,
  errors: responseErrors,
  children,
  action,
}: FormProps<T>) => {
  const methods = useForm({
    defaultValues,
    resolver: schema ? zodResolver(schema) : undefined,
  });
  const {
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (responseErrors) {
      for (const [key, value] of Object.entries(responseErrors)) {
        methods.setError(`root.${key}`, {
          type: 'custom',
          message: {
            summary: value,
            input: value,
          } as any,
        });
      }
    }
  }, [methods, responseErrors]);

  const onSubmit = async (values: T) => {
    await action(values);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {Object.keys(errors).length > 0 && (
          <ErrorSummary
            errorList={Object.entries(errors).map(([key, value]) => ({
              href: `#${key}`,
              children: `${key}: ${value?.message}`,
            }))}
          />
        )}
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
