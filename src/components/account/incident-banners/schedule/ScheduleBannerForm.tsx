'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import type { TypeBannerMessagesOut, TypeBannerScheduleIn } from '@/__generated__/data-contracts';
import { dayjs } from '@/libs/Dayjs';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';

import { ScheduleBannerFormTemplate } from './ScheduleBannerFormTemplate';
import { ScheduleBannerFormTime } from './ScheduleBannerFormTime';

type ScheduleBannerFormProps = {
  templates: TypeBannerMessagesOut[];
};

const ScheduleBannerForm = ({ templates }: ScheduleBannerFormProps) => {
  const t = useTranslations('Forms.Schedule_banner');
  const tCommon = useTranslations('Common');
  const { push } = useRouter();

  const startDate = new Date();

  const { register, handleSubmit, setValue, watch, resetField } = useForm<TypeBannerScheduleIn>({
    defaultValues: {
      messageId: templates[0]?.id,
      broadcastStart: startDate.toJSON(),
      broadcastEnd: dayjs(startDate).add(1, 'year').toJSON(),
    },
  });

  const onSubmit = ({ broadcastStart, broadcastEnd, messageId }: TypeBannerScheduleIn) => {
    const params = new URLSearchParams({
      broadcastStart,
      broadcastEnd,
      messageId,
    });

    push(`/account/incident-banner/schedule/confirm/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ScheduleBannerFormTemplate register={register} templates={templates} />
      <ScheduleBannerFormTime setValue={setValue} watch={watch} resetField={resetField} />
      <ButtonGroup>
        <Button type="submit">
          {t('confirm')}
        </Button>
        <Link href="/account">
          <Button variant="secondary">{tCommon('return', { to: 'account page' })}</Button>
        </Link>
      </ButtonGroup>
    </form>
  );
};

export { ScheduleBannerForm };
