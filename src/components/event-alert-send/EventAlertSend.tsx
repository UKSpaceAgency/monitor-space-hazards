import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { EventAlertSendCurrentStatus } from './EventAlertSendCurrentStatus';
import { EventAlertSendForm } from './EventAlertSendForm';
import type { EventAlertData, EventAlertType } from './EventAlertTypes';

type EventAlertSendProps = {
  content: ReactNode;
  type: EventAlertType;
  detailsSummary: string;
  detailsContent: ReactNode;
  data: EventAlertData;
};

const EventAlertSend = ({ content, type, detailsSummary, detailsContent, data }: EventAlertSendProps) => {
  const t = useTranslations('Forms.Send_alert');
  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      {content}
      <EventAlertSendCurrentStatus type={type} data={data} detailsSummary={detailsSummary} detailsContent={detailsContent} />
      <EventAlertSendForm type={type} defaultValues={data} />
    </div>
  );
};

export { EventAlertSend };
