'use client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { type ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import Hint from '@/ui/hint/hint';
import { Radios, type RadiosProps } from '@/ui/radios/radios';
import TextArea from '@/ui/text-area/text-area';

type BaseFormField = {
  id: string;
  name: string;
  defaultValue?: string | null;
  help?: ReactNode;
};

type TextFormField = {
  type: 'text';
} & BaseFormField;

type RadioFormField = {
  type: 'radio';
} & RadiosProps & BaseFormField;

export type EventAlertFormField = TextFormField | RadioFormField;

type EventAlertEditFormProps = {
  fields: EventAlertFormField[];
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

  const renderTextField = ({ id, name }: BaseFormField) => (
    <>
      <TextArea {...register(id)} />
      <Button variant="secondary" type="button" onClick={() => resetField(id, { defaultValue: '' })}>{t('clear', { name })}</Button>
    </>
  );

  const renderRadioField = ({ id, name, items, ...props }: Omit<RadioFormField, 'type'>) => (
    <Radios
      items={items.map(item => ({
        value: item.value,
        children: item.children,
        defaultChecked: item.value === props.defaultValue,
        ...register(id),
      }))}
      {...props}
    />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map(props => (
        <div key={props.id}>
          <label className="govuk-heading-l" htmlFor={props.id}>{t('add_to', { name: props.name })}</label>
          {props.help && (
            <Hint>
              {props.help}
            </Hint>
          )}
          {props.type === 'radio' ? renderRadioField(props) : renderTextField(props)}
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
