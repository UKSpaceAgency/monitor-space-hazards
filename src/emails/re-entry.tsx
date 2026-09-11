import type { TypeReentryEventOut, TypeReentryEventReportOut, TypeTIPOut } from '@/__generated__/data-contracts';

import { Layout } from './_components/layout';
import { ReentryAnalysisProcess } from './_components/re-entry/analysis-process';
import { ReentryAssessment } from './_components/re-entry/assessment';
import { ReentryDamagesAndLiability } from './_components/re-entry/damages-and-liability';
import { ReentryHandlingSpaceDebris } from './_components/re-entry/handling-space-debris';
import { ReentryLocationsAtRisk } from './_components/re-entry/locations-at-risk';
import { ReentryObjectInformation } from './_components/re-entry/object-information';
import { ReentryPotentialImpact } from './_components/re-entry/potential-impact';
import { ReentryPressAttention } from './_components/re-entry/press-attention';
import { ReentryUnderstandingThisReport } from './_components/re-entry/understanding-this-report';
import { Section } from './_components/section';
import { Subheader } from './_components/subheader';
import type { ReentryLocationAtRisk } from './_utils/reentry-locations';
import { createEmailTranslator, objectTypeIndex } from './_utils/utils';

type ReEntryEmailProps = {
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
  tip: TypeTIPOut;
  withPlaceholders: boolean;
  analysisProcess: string;
  /**
   * Candidate locations for their own "Risk to <location>" block, each with the
   * URL of its rendered map. The email applies the >0.1% threshold and ordering.
   */
  locationsAtRisk?: ReentryLocationAtRisk[];
  /**
   * Level 1 goes to space operations centres and data partners, Level 2 to the
   * wider response community. The two differ only in recipients and wording.
   */
  level?: 1 | 2;
};

const NO_LOCATIONS: ReentryLocationAtRisk[] = [];

function ReEntryEmail({ event, report, withPlaceholders, analysisProcess, locationsAtRisk = NO_LOCATIONS, level = 1 }: ReEntryEmailProps) {
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
      title={`${objectTypeLabel} ${objectName}`.trim()}
      withPlaceholders={withPlaceholders}
      isReentryWarning
      afterFooter={<ReentryAnalysisProcess analysisProcess={analysisProcess} />}
    >
      <Subheader risk={report.fragments_risk ?? event.fragments_risk} />
      {event.executive_summary_comment && <ReentryAssessment executiveSummary={event.executive_summary_comment} />}
      <ReentryLocationsAtRisk locations={locationsAtRisk} event={event} report={report} />
      <Section title={t('Reentry_alert.additional_object_information_title')}>
        <ReentryObjectInformation event={event} report={report} withSurvivabilityAndReportNumber />
      </Section>
      <ReentryPotentialImpact report={report} group="overseas_territories_and_crown_dependencies" />
      <ReentryPotentialImpact report={report} group="uk_mainland" />
      <ReentryPotentialImpact report={report} group="maritime_and_airspace" />
      <Section title={t('Reentry_alert.guidance_on_response_title')}>
        <ReentryDamagesAndLiability damagesLiabilityComment={event.damages_liability_comment} />
        <ReentryHandlingSpaceDebris event={event} withTopSpacing={Boolean(event.damages_liability_comment)} />
        <ReentryPressAttention pressAttention={event.press_attention_comment} />
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
  locationsAtRisk: [
    {
      key: 'united_kingdom',
      fragments_probability: 0.0029,
      fragments_risk: 'Low',
      atmospheric_probability: 0.0035,
      human_casualty_probability: null,
      overflight_time: ['2026-01-07T03:54:00Z', '2026-01-07T17:26:00Z'],
      map_src: 'https://www.dev.monitor-space-hazards.service.gov.uk/nspoclogo2.png',
    },
    {
      key: 'falkland_islands',
      fragments_probability: 0.0027,
      fragments_risk: 'Low',
      atmospheric_probability: 0.0034,
      human_casualty_probability: null,
      overflight_time: ['2026-01-07T03:54:00Z', '2026-01-07T17:26:00Z'],
      map_src: 'https://www.dev.monitor-space-hazards.service.gov.uk/nspoclogo2.png',
    },
    {
      key: 'anguilla',
      fragments_probability: 0.0007,
      atmospheric_probability: 0.0012,
      human_casualty_probability: null,
      overflight_time: ['2026-01-07T03:54:00Z', '2026-01-07T17:26:00Z'],
      map_src: 'https://www.dev.monitor-space-hazards.service.gov.uk/nspoclogo2.png',
    },
    {
      key: 'jersey',
      fragments_probability: 0.00001,
      atmospheric_probability: 0.00001,
      human_casualty_probability: null,
      overflight_time: ['2026-01-07T03:54:00Z'],
      map_src: 'https://www.dev.monitor-space-hazards.service.gov.uk/nspoclogo2.png',
    },
  ],
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
    executive_summary_comment: 'ipseum',
    damages_liability_comment: 'The United States is liable for any damages and associated costs of the response and recovery efforts caused by the re-entry under the terms of the 1972 Space Liability Convention.',
    press_attention_comment: 'There has been limited press attention on this event so far.',
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
        scotland_nation: { fragments_probability: 0.00001, atmospheric_probability: 0.00001, overflight_time: ['2026-01-07T03:54:00Z'] },
        wales_nation: { fragments_probability: 0.00001, atmospheric_probability: 0.00001, overflight_time: ['2026-01-07T03:54:00Z'] },
        northern_ireland_nation: { fragments_probability: 0.00004, atmospheric_probability: 0.00006, overflight_time: ['2026-01-07T03:54:00Z'] },
      },
      maritime_and_airspace: {
        uk_navarea: { fragments_probability: 0.00029, atmospheric_probability: 0.0003, overflight_time: ['2026-01-07T03:54:00Z'] },
        london_fir: { fragments_probability: 0.00001, atmospheric_probability: 0.00001, overflight_time: ['2026-01-07T03:54:00Z'] },
        scotland_fir: { fragments_probability: 0.01535, atmospheric_probability: 0.00107, overflight_time: ['2026-01-07T03:54:00Z'] },
        shanwick_airspace: { fragments_probability: 0.0014, atmospheric_probability: 0.00295, overflight_time: ['2026-01-07T03:54:00Z'] },
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
