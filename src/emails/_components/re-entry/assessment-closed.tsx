import { Section as EmailSection } from '@react-email/components';
import { isNumber } from 'lodash';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { createEmailTranslator } from '@/emails/_utils/utils';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';

import { Map } from '../map';
import { Section } from '../section';
import { Table } from '../table';
import { Text } from '../text';

type ReentryAssessmentClosedProps = {
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
};

const UNKNOWN = 'Unknown';

export const ReentryAssessmentClosed = ({ event, report }: ReentryAssessmentClosedProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Assessment' });

  const decayEpoch = report.decay_epoch ?? event.decay_epoch;
  const uncertaintyWindow = report.uncertainty_window ?? event.uncertainty_window;

  const data = [
    [t('re_entry_location'), event.closed_comment ?? ''],
    [t('time'), decayEpoch ? dayjs.utc(decayEpoch).format(FORMAT_FULL_DATE_TIME) : UNKNOWN],
    [
      t('uncertainty_window'),
      isNumber(uncertaintyWindow)
        ? `+/- ${uncertaintyWindow} ${uncertaintyWindow === 1 ? t('minute') : t('minutes')}`
        : UNKNOWN,
    ],
  ];

  return (
    <Section title={t('title')}>
      <EmailSection className="!w-full pb-4">
        <Text className="italic">{event.executive_summary_comment}</Text>
        <Table data={data} forceAlignLeft />
      </EmailSection>
      <EmailSection className="!w-full pb-4">
        <Text className="italic mb-2">{t('potential_debris_field')}</Text>
        <Map src="{{DEBRIS_FIELD_MAP.src}}" width="580" showLegend={false} />
      </EmailSection>
      <EmailSection className="!w-full">
        <Text className="italic mb-2">{t('flight_path')}</Text>
        <Map src="{{FLIGHT_PATH_MAP.src}}" width="580" />
      </EmailSection>
    </Section>
  );
};
