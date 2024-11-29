'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';

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
  const t = useTranslations('Forms.ContactAnalyst');
  const { push } = useRouter();

  const { id, callback } = searchParams;

  const methods = useForm<ContactAnalystSchema>({
    defaultValues: contactAnalystFormDefaultValues,
    resolver: zodResolver(contactAnalyst),
  });

  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit: SubmitHandler<ContactAnalystSchema> = async ({ messageContent }) => {
    await postMessagesContactAnalyst({
      eventId: id,
      messageContent,
    });

    push(`/contact-analyst/send?callback=${callback}`);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormErrorSummary i18path="ContactAnalyst" errors={errors} />
        <TextArea
          {...register('messageContent')}
          id="message"
          error={errors.messageContent?.message}
        />
        <Button type="submit">{t('submit')}</Button>
      </form>
    </FormProvider>
  );
};

export { ContactAnalystForm };
