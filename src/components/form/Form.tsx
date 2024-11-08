'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import type {
  DefaultValues,
} from 'react-hook-form';
import {
  FormProvider,
  useForm,
} from 'react-hook-form';
import type { z } from 'zod';

import ErrorSummary from '@/ui/error-summary/error-summary';

import { TopNotificationBanner } from '../TopNotificationBanner';

export type FormProps<T extends object> = {
  defaultValues?: DefaultValues<T>;
  schema?: z.Schema<DefaultValues<T>>;
  isSubmitting?: boolean;
  action: (values: T) => Promise<unknown>;
  errors?: {
    [key: string]: unknown;
  };
  i18path: keyof IntlMessages['Forms'];
  children: ReactNode;
};

const Form = <T extends object>({
  defaultValues,
  schema,
  errors: responseErrors,
  children,
  action,
  i18path,
}: FormProps<T>) => {
  const t = useTranslations(`Forms.${i18path}`);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

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
    setIsError(false);
    setIsSuccess(false);
    try {
      await action(values);
      setIsSuccess(true);
    } catch {
      setIsError(true);
    }
  };

  return (
    <FormProvider {...methods}>
      {isSuccess && <TopNotificationBanner status="success">{t('success_message')}</TopNotificationBanner>}
      {isError && <TopNotificationBanner status="error">{t('error_message')}</TopNotificationBanner>}
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {Object.keys(errors).length > 0 && (
          <ErrorSummary
            errorList={Object.entries(errors).map(([key, value]) => ({
              href: `#${key}`,
              children: `${t(key as any)}: ${value?.message}`,
            }))}
          />
        )}
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
