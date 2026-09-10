import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';

import { Layout } from './_components/layout';
import { ReentryAssessmentClosed } from './_components/re-entry/assessment-closed';
import { ReentryObjectInformation } from './_components/re-entry/object-information';
import { ReentryUnderstandingThisReportClosed } from './_components/re-entry/understanding-this-report-closed';
import { Section } from './_components/section';
import { Subheader } from './_components/subheader';
import { createEmailTranslator } from './_utils/utils';

type ReEntryEmailProps = {
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
  withPlaceholders: boolean;
  /**
   * Level 1 goes to space operations centres and data partners, Level 2 to the
   * wider response community. Drives the wording of "Understanding This Report".
   */
  level?: 1 | 2;
  /** Free text analyst assessment (executive_summary_level_1 / executive_summary_level_2). */
  assessment?: string | null;
  /** Human readable re-entry location, e.g. "Atlantic Ocean". */
  reentryLocation?: string | null;
};

function ReEntryClosedownEmail({ event, report, withPlaceholders, level = 1, assessment, reentryLocation }: ReEntryEmailProps) {
  const t = createEmailTranslator({ namespace: 'Emails' });

  return (
    <Layout
      eventType="re-entry"
      shortId={event.short_id}
      title={`${event.object_name}`}
      withPlaceholders={withPlaceholders}
      isReentryWarning
    >
      <Subheader comment={event.closed_comment} />
      <ReentryAssessmentClosed event={event} report={report} assessment={assessment} reentryLocation={reentryLocation} />
      <Section title={t('Reentry_alert.object_information_title')}>
        <ReentryObjectInformation event={event} report={report} />
      </Section>
      <ReentryUnderstandingThisReportClosed level={level} />
    </Layout>
  );
}

ReEntryClosedownEmail.PreviewProps = {
  pageUrl: 'https://www.dev.monitor-space-hazards.service.gov.uk',
  level: 1,
  assessment: 'FREE TEXT JSON field "executive_summary_level_1"',
  reentryLocation: 'Atlantic Ocean',
  event: {
    closed_comment: 'Closed comment',
    object_name: 'Falcon 9 Second Stage',
    object_type: 'R/B',
    estimated_mass: 2000,
    object_height: 11.3,
    object_width: 2.2,
    decay_epoch: '2024-01-20T10:00:00Z',
    uncertainty_window: 120,
    overflight_time: ['2024-01-20T09:30:00Z', '2024-01-20T10:30:00Z'],
    atmospheric_risk: 'High',
    atmospheric_probability: 0.85,
    licensed_country: 'United States',
    short_id: '1234567890',
    norad_id: '43657',
    uk_response_comment: 'Recovery and clean up',
    press_attention_comment: 'Press attention',
    executive_summary_comment: 'Executive summary',
  },
  tip: {
    direction: 'ascending',
  },
  report: {
    norad_id: '43657',
    decay_epoch: '2026-01-08T00:34:00Z',
    uncertainty_window: 1,
    estimated_mass: 2000,
    object_height: 11.3,
    object_width: 2.2,
    licensing_country: 'US',
    fragments_probability: 0.6,
    overflight_time: ['2024-01-20T09:30:00Z', '2024-01-20T10:30:00Z'],
    impact: {
      by_nation: {
        england_nation: { probability: 0.6, overflight_time: ['2024-01-20T09:30:00Z'] },
        scotland_nation: { probability: 0.3, overflight_time: ['2024-01-20T09:45:00Z'] },
        wales_nation: { probability: 0.2, overflight_time: ['2024-01-20T10:00:00Z'] },
      },
      overseas_territories_and_crown_dependencies: {
        gibraltar: { probability: 0.05, overflight_time: ['2024-01-20T08:30:00Z'] },
      },
      maritime_and_airspace: {
        south_georgia_and_the_south_sandwich_islands: { probability: 0.8, overflight_time: ['2024-01-20T09:20:00Z'] },
        turks_and_caicos_islands: { probability: 0.6, overflight_time: ['2024-01-20T09:25:00Z'] },
      },
    },
  },
  withPlaceholders: false,
};

export default ReEntryClosedownEmail;
