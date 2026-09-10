import { Section as EmailSection } from '@react-email/components';
import { isNumber } from 'lodash';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { createEmailTranslator } from '@/emails/_utils/utils';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';

import { Map } from '../map';
import { Markdown } from '../markdown';
import { Section } from '../section';
import { Table } from '../table';
import { Text } from '../text';

type ReentryAssessmentClosedProps = {
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
  /** Free text analyst assessment (executive_summary_level_1 / executive_summary_level_2). */
  assessment?: string | null;
  /** Human readable re-entry location, e.g. "Atlantic Ocean". */
  reentryLocation?: string | null;
};

const UNKNOWN = 'Unknown';

export const ReentryAssessmentClosed = ({ event, report, assessment, reentryLocation }: ReentryAssessmentClosedProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Assessment' });

  const decayEpoch = report.decay_epoch ?? event.decay_epoch;
  const uncertaintyWindow = report.uncertainty_window ?? event.uncertainty_window;

  const data = [
    [t('re_entry_location'), reentryLocation ?? UNKNOWN],
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
        {assessment
          ? <Markdown markdownCustomStyles={{ p: { fontSize: '14px', lineHeight: '20px', marginTop: '0', marginBottom: '16px', fontStyle: 'italic' } }}>{assessment}</Markdown>
          // The analyst assessment is not yet exposed by the API, so the copy
          // below stands in until the field is available.
          : <Text className="italic">{t('placeholder')}</Text>}
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
