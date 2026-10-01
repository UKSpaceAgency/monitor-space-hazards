import { Section as EmailSection } from '@react-email/components';

import type { TypeReentryEventOut, TypeReentryEventReportOut, TypeTIPOut } from '@/__generated__/data-contracts';
import { getReentryFragmentsRisk } from '@/utils/ReentryRisk';

import { Layout } from './_components/layout';
import { Map } from './_components/map';
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
   * Map images (and optional display names) for the "Risk to <location>"
   * blocks. Which locations appear, and their data, is derived from the
   * report with the same logic as the website.
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

  const risk = getReentryFragmentsRisk({
    fragmentsRisk: event.highest_impact?.highest_risk,
    objectName,
  });

  return (
    <Layout
      eventType="re-entry"
      shortId={event.short_id}
      title={`${objectTypeLabel} ${objectName}`.trim()}
      withPlaceholders={withPlaceholders}
      isReentryWarning
      afterFooter={<ReentryAnalysisProcess analysisProcess={analysisProcess} />}
    >
      <Subheader risk={risk} />
      {event.executive_summary_comment && <ReentryAssessment executiveSummary={event.executive_summary_comment} />}
      <ReentryLocationsAtRisk locations={locationsAtRisk} report={report} />
      <EmailSection className="!w-full pb-8">
        <Map src="{{WORLD_MAP.src}}" />
      </EmailSection>
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
      fragments_risk: 'No',
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
    id: 'a805c31f-b879-4141-8250-60dcc0ca4ed7',
    created_at: '2025-11-19T16:22:25.009782',
    updated_at: '2026-09-28T09:51:19.713061',
    short_id: 'RE25-0753',
    norad_id: '44759',
    time_window_start: '2025-11-20T10:02:00',
    time_window_end: '2025-11-21T00:02:00',
    decay_epoch: '2025-11-20T17:02:00',
    uncertainty_window: 420,
    tip_external_id: '56708',
    insert_epoch: null,
    tip_creation_date: null,
    reentry_report_number: 34,
    year: 2025,
    event_number: 753,
    closed_comment: '',
    highest_probability: 0.002,
    highest_impact: {
      region: 'anguilla',
      highest_impact_data: {
        atmospheric_probability: 0.002,
        fragments_probability: 0.002,
        human_casualty_probability: 0,
      },
      highest_probability_name: 'atmospheric_probability',
      highest_risk: 'No',
    },
    atmospheric_probability: 0,
    atmospheric_risk: 'No',
    fragments_probability: 0,
    fragments_risk: 'No',
    fragments_number: null,
    human_casualty_probability: null,
    human_casualty_risk: null,
    overflight_time: [],
    survivability: 'Likely',
    survivability_comment: 'Given the use of components that are prone to surviving re-entry (e.g. reaction wheels)',
    executive_summary_comment: 'TEST SO',
    immediate_response_comment: 'TEST SO',
    uk_response_comment: 'TEST SO',
    damages_liability_comment: 'TEST SO',
    press_attention_comment: 'TEST SO',
    object_name: 'STARLINK-1054',
    object_type: 'PAYLOAD',
    estimated_mass: 260,
    license_country: 'US',
    international_designator: '2019-074AY',
    object_height: 0.1,
    object_width: 3.7,
    object_span: 8.86,
    launching_year: 2019,
    apogee: 197,
    perigee: 195,
    inclination: 53.03,
    approved_by_id: null,
    approved_at: null,
    licensed_country: null,
    uk_reentry_probability: 'Low',
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
    fragments_risk: 'None',
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
