'use client';

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
      message_id: templates[0]?.id,
      broadcast_start: startDate.toJSON(),
      broadcast_end: dayjs(startDate).add(1, 'year').toJSON(),
    },
    reValidateMode: 'onSubmit',
  });

  const onSubmit = ({ broadcast_start, broadcast_end, message_id }: TypeBannerScheduleIn) => {
    const params = new URLSearchParams({
      broadcast_start,
      broadcast_end,
      message_id,
    });

    push(`/account/incident-banner/schedule/confirm/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ScheduleBannerFormTemplate register={register} templates={templates} />
      <ScheduleBannerFormTime setValue={setValue} watch={watch} resetField={resetField} />
      <ButtonGroup>
        <Button type="submit" aria-label={t('confirm')}>
          {t('confirm')}
        </Button>
        <Button as="link" href="/account" variant="secondary" aria-label={tCommon('return', { to: 'account page' })}>{tCommon('return', { to: 'account page' })}</Button>
      </ButtonGroup>
    </form>
  );
};

export { ScheduleBannerForm };
