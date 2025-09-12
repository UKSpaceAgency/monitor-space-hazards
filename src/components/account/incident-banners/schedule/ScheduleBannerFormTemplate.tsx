import { } from 'lodash';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';
import type { UseFormRegister } from 'react-hook-form';

import type { TypeBannerMessagesOut, TypeBannerScheduleIn } from '@/__generated__/data-contracts';
import { HtmlMapper } from '@/components/HtmlMapper';
import NotificationBanner from '@/ui/notification-banner/notification-banner';
import Radios from '@/ui/radios/radios';

type BannerTemplateProps = {
  register: UseFormRegister<TypeBannerScheduleIn>;
  templates: TypeBannerMessagesOut[];
};

const renderTemplate = ({ id, title, content }: TypeBannerMessagesOut) => (
  <Fragment key={id}>
    <p className="govuk-body">{title}</p>
    <NotificationBanner aria-label={title}>
      <HtmlMapper content={content} />
    </NotificationBanner>
  </Fragment>
);

const ScheduleBannerFormTemplate = ({ register, templates }: BannerTemplateProps) => {
  const t = useTranslations('Forms.Schedule_banner');
  return (
    <div>
      <h2 className="app-task-list__section govuk-heading-m">
        {t('select_banner')}
      </h2>
      <Radios
        id="message_id"
        required
        aria-label="Message Id"
        items={templates.map(template => ({
          id: 'message_id',
          value: template.id,
          className: 'w-full',
          children: renderTemplate(template),
          ...register('messageId'),
        }))}
      />
    </div>
  );
};

export { ScheduleBannerFormTemplate };
