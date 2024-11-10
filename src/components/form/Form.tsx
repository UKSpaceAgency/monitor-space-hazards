'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactNode } from 'react';
import type {
  DefaultValues,
} from 'react-hook-form';
import {
  FormProvider,
  useForm,
} from 'react-hook-form';
import type { ZodSchema } from 'zod';

export type FormProps<T extends object> = {
  defaultValues?: DefaultValues<T>;
  schema?: ZodSchema;
  action: (values: T) => Promise<{ data?: unknown; error?: object | string; ok: boolean }>;
  i18path: keyof IntlMessages['Forms'];
  children: ReactNode;
  successMessage?: ReactNode;
};

const Form = <T extends object>({
  defaultValues,
  schema,
  children,
  action,
}: FormProps<T>) => {
  const methods = useForm({
    defaultValues,
    resolver: schema ? zodResolver(schema) : undefined,
  });

  const onSubmit = async (values: T) => {
    const { ok, error } = await action(values);
    if (!ok) {
      if (typeof error === 'object' && 'detail' in error) {
        if (typeof error.detail === 'string') {
          methods.setError('root', {
            message: error.detail,
          });
        }
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
