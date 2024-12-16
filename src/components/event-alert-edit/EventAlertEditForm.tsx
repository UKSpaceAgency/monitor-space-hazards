'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import Hint from '@/ui/hint/hint';
import TextArea from '@/ui/text-area/text-area';

type FormFields = {
  id: string;
  name: string;
  defaultValue?: string | null;
  help: ReactNode;
};

type EventAlertEditFormProps = {
  fields: FormFields[];
};

const EventAlertEditForm = ({ fields }: EventAlertEditFormProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const t = useTranslations('Forms.Edit_alert');
  const tCommon = useTranslations('Common');

  const { register, handleSubmit, resetField, reset } = useForm({
    defaultValues: fields.reduce<{ [key: string]: string }>((acc, field) => {
      acc[field.id] = field.defaultValue || '';
      return acc;
    }, {}),
  });

  const onSubmit = async (data: Record<string, any>) => {
    const searchParams = new URLSearchParams(data);
    router.push(`${pathname}/review?${searchParams.toString()}`);
  };

  useEffect(() => {
    if (searchParams.size > 0) {
      const defaultValues = Object.fromEntries(searchParams);
      reset(defaultValues);
    }
  }, [searchParams, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map(({ id, name, help }) => (
        <div key={id}>
          <label className="govuk-heading-l" htmlFor={id}>{t('add_to', { name })}</label>
          <Hint>
            {help}
          </Hint>
          <TextArea {...register(id)} />
          <Button variant="secondary" type="button" onClick={() => resetField(id, { defaultValue: '' })}>{t('clear', { name })}</Button>
        </div>
      ))}
      <ButtonGroup>
        <Button type="submit">{t('review')}</Button>
        <Link href="/alert">
          <Button variant="secondary">{tCommon('return', { to: 'event' })}</Button>
        </Link>
      </ButtonGroup>
    </form>
  );
};

export { EventAlertEditForm };
