import { createTranslator } from 'next-intl';

import type { TypeFragmentationEvent, TypeFragmentationReportOut } from '@/__generated__/data-contracts';
import type { ScreeningResults } from '@/actions/getFragmentationEventScreeningResults';
import { env } from '@/libs/Env';
import messages from '@/locales/en.json';

import { FragmentationEventDetails } from './_components/fragmentation/event-details';
import { FragmentationEventSummary } from './_components/fragmentation/event-summary';
import { FragmentationPotentialImpact } from './_components/fragmentation/potential_impact';
import { FragmentationPressAttention } from './_components/fragmentation/press-attention';
import { FragmentationUkResponse } from './_components/fragmentation/uk_reponse';
import { Layout } from './_components/layout';
import { Markdown } from './_components/markdown';
import { Section } from './_components/section';
import { SignIn } from './_components/sign_in';
import { Subheader } from './_components/subheader';
import { Text } from './_components/text';

type FragmentationEmailProps = {
  event: TypeFragmentationEvent;
  report: TypeFragmentationReportOut;
  screeningResults: ScreeningResults[];
  withPlaceholders: boolean;
};

function FragmentationEmail({ event, report, screeningResults, withPlaceholders }: FragmentationEmailProps) {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails',
    messages,
  });

  const eventLink = `${env.NEXTAUTH_URL}/fragmentations/${event.short_id}`;

  return (
    <Layout
      eventType="fragmentation"
      shortId={event.short_id}
      title={t('Fragmentation.title', { reportNumber: report.report_number })}
      subtitle={`${event.primary_object_common_name} ${event.secondary_object_common_name ? `vs ${event.secondary_object_common_name}` : ''}`}
      withPlaceholders={withPlaceholders}
    >
      <Subheader risk={event.risk} />
      <Section title={t('Fragmentation.event_summary_title')} className="!w-full">
        <FragmentationEventSummary event={event} screeningResults={screeningResults} className="!w-full pb-4" />
        <Text className="mb-0">{t('utc_note')}</Text>
      </Section>
      <Section title={t('Fragmentation.event_details_title')} className="!w-full">
        {event.executive_summary_comment && (
          <>
            <Text className="text-sm mb-2 font-bold">{t('Fragmentation.Event_details.event_information')}</Text>
            <Markdown>{event.executive_summary_comment}</Markdown>
          </>
        )}
        <FragmentationEventDetails report={report} className="!w-full" />
      </Section>
      <Section title={t('Fragmentation.Potential_impact_title')} className="!w-full">
        {event.spaceflight_risk_comment && (
          <>
            <Text className="text-sm mb-2 font-bold">{t('Fragmentation.Potential_impact.uk_risk')}</Text>
            <Markdown>{event.spaceflight_risk_comment}</Markdown>
          </>
        )}
        <Text className="text-sm mb-2 font-bold">{t('Fragmentation.Potential_impact.uk_satellites_affected')}</Text>
        <Markdown>{t('Fragmentation.Potential_impact.content')}</Markdown>
        <FragmentationPotentialImpact data={screeningResults} />
      </Section>
      <Section title={t('Fragmentation.guidance_title')}>
        <FragmentationUkResponse ukResponse={event.uk_response_comment} />
        <FragmentationPressAttention pressAttention={event.press_attention_comment} />
        <SignIn link={eventLink} />
      </Section>
    </Layout>
  );
}

FragmentationEmail.PreviewProps = {
  pageUrl: 'https://www.dev.monitor-space-hazards.service.gov.uk',
  tip: {
    direction: 'ascending',
  },
  event: {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    created_at: '2026-02-27T11:01:07.139Z',
    updated_at: '2026-02-27T11:01:07.139Z',
    short_id: 'string',
    event_epoch: '2026-02-27T11:01:07.139Z',
    year: 0,
    event_number: 0,
    risk: 'Very low',
    modelled_fragments: 0,
    known_fragments: 0,
    fragmentation_type: 'Unknown',
    affected_regime: 'GEO',
    conjunction_event_id: 'string',
    alert_type: [
      'standard',
    ],
    executive_summary_comment: 'string',
    closed_comment: 'string',
    uk_response_comment: 'string',
    press_attention_comment: 'string',
    object_history_comment: 'string',
    orbital_analyst_comment: 'string',
    spaceflight_risk_comment: 'string',
    fragmentation_type_comment: 'string',
    primary_object_common_name: 'string',
    primary_object_norad_id: 'string',
    primary_object_type: 'string',
    primary_object_licensing_country: 'string',
    secondary_object_common_name: 'string',
    secondary_object_norad_id: 'string',
    secondary_object_type: 'string',
    secondary_object_licensing_country: 'string',
    is_active: true,
    report_number: 0,
    report_time: '2026-02-27T11:01:07.140Z',
  },
  report: {
    primary_object_common_name: 'Falcon 9 Second Stage',
    secondary_object_common_name: 'Falcon 9 Second Stage',
    primary_object_type: 'ROCKET BODY',
    secondary_object_type: 'ROCKET BODY',
    primary_object_norad_id: '1234567890',
    secondary_object_norad_id: '1234567890',
    primary_object_licensing_country: 'United States',
    secondary_object_licensing_country: 'United States',
    primary_object_mass: 1000,
    secondary_object_mass: 1000,
    primary_object_launching_year: 2024,
    secondary_object_launching_year: 2024,
    primary_object_apogee: 1000,
    secondary_object_apogee: 1000,
    primary_object_perigee: 1000,
    secondary_object_perigee: 1000,
    primary_object_inclination: 1000,
    secondary_object_inclination: 1000,
    report_number: 1234567890,
    report_time: '2024-01-20T10:00:00Z',
    event_epoch: '2024-01-20T10:00:00Z',
    known_fragments: 10,
    modelled_fragments: 10,
    risk: 'High',
    affected_regime: 'Regime 1',
    fragmentation_type: 'Fragmentation Type 1',
  },
  screeningResults: [
    {
      norad_id: '1234567890',
      object_name: 'Falcon 9 Second Stage',
      mass: 1000,
      current_tally: 10,
      fragments_tally: 10,
    },
    {
      norad_id: '1234567890',
      object_name: 'Falcon 9 Second Stage',
      mass: 1000,
      current_tally: 10,
      fragments_tally: 10,
    },
    {
      norad_id: '1234567890',
      object_name: 'Falcon 9 Second Stage',
      mass: 1000,
      current_tally: 10,
      fragments_tally: 10,
    },
  ],
  withPlaceholders: false,
};

export default FragmentationEmail;
