'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { postMessagesContactAnalyst } from '@/actions/postMessagesContactAnalyst';
import Button from '@/ui/button/button';
import TextArea from '@/ui/text-area/text-area';
import type { ContactAnalystSchema } from '@/validations/contactAnalystSchema';
import { contactAnalyst, contactAnalystFormDefaultValues } from '@/validations/contactAnalystSchema';

import { FormErrorSummary } from '../form/FormErrorSummary';

type ContactAnalystFormProps = {
  searchParams: {
    id: string;
    callback: string;
  };
};

const ContactAnalystForm = ({ searchParams }: ContactAnalystFormProps) => {
  const t = useTranslations('Forms.Contact_analyst');

  const { id, callback } = searchParams;

  const { register, handleSubmit, formState: { errors } } = useForm<ContactAnalystSchema>({
    defaultValues: contactAnalystFormDefaultValues,
    resolver: zodResolver(contactAnalyst),
  });

  const onSubmit: SubmitHandler<ContactAnalystSchema> = async ({ messageContent }) => {
    await postMessagesContactAnalyst({
      eventId: id,
      messageContent,
    }, callback);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormErrorSummary i18path="Contact_analyst" errors={errors} />
      <TextArea
        {...register('messageContent')}
        id="message"
        error={errors.messageContent?.message}
        required
        aria-label="Message Content"
      />
      <Button type="submit" aria-label={t('submit')}>{t('submit')}</Button>
    </form>
  );
};

export { ContactAnalystForm };
