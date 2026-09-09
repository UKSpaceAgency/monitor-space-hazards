import { Section as EmailSection } from '@react-email/components';

import type { TypeReentryEventOut, TypeReentryEventReportOut, TypeTIPOut } from '@/__generated__/data-contracts';

import { Layout } from './_components/layout';
import { Map } from './_components/map';
import { ReentryAnalysisProcess } from './_components/re-entry/analysis-process';
import { ReentryAssessment } from './_components/re-entry/assessment';
import { ReentryEventSummaryTable } from './_components/re-entry/event-summary-table';
import { ReentryHandlingSpaceDebris } from './_components/re-entry/handling-space-debris';
import { ReentryLocationsAtRisk } from './_components/re-entry/locations-at-risk';
import { ReentryOtherRegionsAtRisk } from './_components/re-entry/other-regions-at-risk';
import { ReentryUnderstandingThisReport } from './_components/re-entry/understanding-this-report';
import { Section } from './_components/section';
import { Subheader } from './_components/subheader';
import { createEmailTranslator, objectTypeIndex } from './_utils/utils';

type ReEntryEmailProps = {
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
  tip: TypeTIPOut;
  withPlaceholders: boolean;
  /**
   * Level 1 goes to space operations centres and data partners, Level 2 to the
   * wider response community. The two differ only in recipients and wording.
   */
  level?: 1 | 2;
  /** Free text analyst assessment (assessment_l1 / assessment_l2). */
  assessment?: string | null;
  /** "Standard" or "UKSA Enhanced". */
  analysisProcess?: string | null;
};

function ReEntryEmail({ event, report, withPlaceholders, level = 1, assessment, analysisProcess }: ReEntryEmailProps) {
  const t = createEmailTranslator({ namespace: 'Emails' });

  const objectName = report.object_name ?? event.object_name ?? '';
  const objectType = report.object_type ?? event.object_type;
  const objectTypeLabel = objectType
    ? objectTypeIndex[objectType as keyof typeof objectTypeIndex] ?? objectType
    : '';

  return (
    <Layout
      eventType="re-entry"
      shortId={event.short_id}
      official
      banner={t('Reentry_alert.banner', { level })}
      subtitle={`${objectTypeLabel} ${objectName}`.trim()}
      withPlaceholders={withPlaceholders}
      isReentryWarning
      afterFooter={<ReentryAnalysisProcess analysisProcess={analysisProcess} />}
    >
      <Subheader risk={report.fragments_risk ?? event.fragments_risk} />
      <ReentryAssessment assessment={assessment} />
      <ReentryLocationsAtRisk report={report} />
      <EmailSection className="!w-full pb-8">
        <Map src="{{WORLD_MAP.src}}" />
      </EmailSection>
      <Section title={t('Reentry_alert.event_summary_title')}>
        <ReentryEventSummaryTable event={event} report={report} />
      </Section>
      <Section title={t('Reentry_alert.other_regions_at_risk_title')}>
        <ReentryOtherRegionsAtRisk report={report} />
      </Section>
      <Section title={t('Reentry_alert.handling_advice_title')}>
        <ReentryHandlingSpaceDebris event={event} />
      </Section>
      <ReentryUnderstandingThisReport level={level} />
    </Layout>
  );
}

ReEntryEmail.PreviewProps = {
  pageUrl: 'https://www.dev.monitor-space-hazards.service.gov.uk',
  level: 1,
  assessment: null,
  analysisProcess: null,
  tip: {
    direction: 'ascending',
  },
  event: {
    object_name: 'CZ-2A',
    object_type: 'ROCKET BODY',
    estimated_mass: 2000,
    decay_epoch: '2026-01-08T00:34:00Z',
    uncertainty_window: 1440,
    overflight_time: ['2026-01-07T03:54:00Z', '2026-01-07T17:26:00Z'],
    atmospheric_risk: 'Low',
    atmospheric_probability: 0.00014,
    fragments_risk: 'Low',
    fragments_probability: 0.00017,
    licensed_country: 'US',
    short_id: '1234567890',
    norad_id: '43657',
    object_height: 11.3,
    object_width: 2.2,
    survivability: 'Likely',
    survivability_comment:
      'The high-density components of rocket bodies can result in an increased chance of survival upon re-entry.',
  },
  report: {
    report_number: 1,
    norad_id: '43657',
    object_name: 'COSMOS 1674',
    object_type: 'PAYLOAD',
    decay_epoch: '2026-01-08T00:34:00Z',
    uncertainty_window: 1440,
    estimated_mass: 2000,
    object_height: 11.3,
    object_width: 2.2,
    licensing_country: 'US',
    survivability: 'Likely',
    survivability_comment:
      'The high-density components of rocket bodies can result in an increased chance of survival upon re-entry.',
    fragments_probability: 0.0017,
    fragments_risk: 'Low',
    atmospheric_probability: 0.0014,
    human_casualty_probability: null,
    overflight_time: ['2026-01-07T03:54:00Z', '2026-01-07T17:26:00Z'],
    impact: {
      by_nation: {
        england_nation: { fragments_probability: 0.00029, atmospheric_probability: 0.0003, overflight_time: ['2026-01-07T03:54:00Z'] },
      },
      maritime_and_airspace: {
        uk_navarea: { fragments_probability: 0.00029, atmospheric_probability: 0.0003, overflight_time: ['2026-01-07T03:54:00Z'] },
        shanwick_airspace: { fragments_probability: 0.00003, atmospheric_probability: 0.00002, overflight_time: ['2026-01-07T03:54:00Z'] },
      },
      overseas_territories_and_crown_dependencies: {
        falkland_islands: { fragments_probability: 0.0022, atmospheric_probability: 0.0019, overflight_time: ['2026-01-07T03:54:00Z', '2026-01-07T17:26:00Z'] },
        anguilla: { fragments_probability: 0.0012, atmospheric_probability: 0.001, overflight_time: ['2026-01-07T03:54:00Z', '2026-01-07T17:26:00Z'] },
        british_virgin_islands: { fragments_probability: 0.0011, atmospheric_probability: 0.0009, overflight_time: ['2026-01-07T03:54:00Z', '2026-01-07T17:26:00Z'] },
        jersey: { fragments_probability: 0.00001, atmospheric_probability: 0.00001, overflight_time: ['2026-01-07T03:54:00Z'] },
      },
    },
  },
  withPlaceholders: false,
};

export default ReEntryEmail;
