'use client';

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
  startDate: Date;
  handleForm: (data: TypeBannerScheduleIn) => void;
};

const ScheduleBannerForm = ({ templates, startDate, handleForm }: ScheduleBannerFormProps) => {
  const t = useTranslations('Forms.Schedule_banner_form');

  const { register, handleSubmit, setValue, watch, resetField } = useForm<TypeBannerScheduleIn>({
    defaultValues: {
      messageId: templates[0]?.id,
      broadcastStart: startDate.toJSON(),
      broadcastEnd: dayjs(startDate).add(1, 'year').toJSON(),
    },
  });

  const onSubmit = (data: TypeBannerScheduleIn) => {
    handleForm(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ScheduleBannerFormTemplate register={register} templates={templates} />
      <ScheduleBannerFormTime setValue={setValue} watch={watch} resetField={resetField} />
      <ButtonGroup>
        <Button type="submit">
          {t('confirm')}
        </Button>
      </ButtonGroup>

    </form>
  );
};

export { ScheduleBannerForm };
