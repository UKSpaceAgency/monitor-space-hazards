import { createTranslator } from 'next-intl';

import type { TypeConjunctionReportOut, TypeUniqueEventOut } from '@/__generated__/data-contracts';
import { env } from '@/libs/Env';
import messages from '@/locales/en.json';

import { ConjunctionEventDetails } from './_components/conjunction/event-details';
import { ConjunctionEventOverview } from './_components/conjunction/event-overview';
import { Layout } from './_components/layout';
import { Section } from './_components/section';
import { Subheader } from './_components/subheader';

type ConjunctionClosedownEmailProps = {
  report: TypeConjunctionReportOut;
  event: TypeUniqueEventOut;
  withPlaceholders: boolean;
};

function ConjunctionClosedownEmail({ report, event, withPlaceholders }: ConjunctionClosedownEmailProps) {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails',
    messages,
  });

  const eventLink = `${env.NEXTAUTH_URL}/conjunctions/${report.short_id}/alert`;

  return (
    <Layout
      eventType="conjunction"
      shortId={report.short_id}
      title={t('Conjunction_alert.title_closed', { reportNumber: report.report_number })}
      subtitle={`${report.primary_object_common_name} vs ${report.secondary_object_common_name}`}
      withPlaceholders={withPlaceholders}
    >
      <Subheader comment={event.closed_comment} />
      <Section title={t('Conjunction_alert.event_overview_title')}>
        <ConjunctionEventOverview eventUrl={eventLink} event={event} report={report} />
      </Section>
      <Section title={t('Conjunction_alert.event_details_title')}>
        <ConjunctionEventDetails eventUrl={eventLink} event={event} report={report} />
      </Section>
    </Layout>
  );
}

ConjunctionClosedownEmail.PreviewProps = {
  event: {
    pressAttentionAddition: 'This is a test press attention addition',
    immediateImpactAddition: 'This is a test immediate impact addition',
    ukResponseAddition: 'This is a test UK response addition',
  },
  report: {
    id: '550e8400-e29b-41d4-a716-446655440000',
    created_at: '2024-01-20T08:00:00Z',
    updated_at: '2024-01-20T08:00:00Z',
    short_id: 'CONJ-2024-001',
    report_number: 1,
    report_time: '2024-01-20T08:00:00Z',
    risk: 'Low',
    alert_type: ['priority', 'uk-licensed'],
    tca_time: '2024-01-20T10:30:00Z',
    collision_probability: 0.85,
    manoeuvre_expected: 'Likely',
    manoeuvre_addition: 'Primary object will perform avoidance manoeuvre',
    primary_object_common_name: 'Starlink-1234',
    primary_object_norad_id: '12345',
    primary_object_licensing_country: 'GB',
    primary_object_type: 'Communication',
    primary_object_mission: 'Broadband Internet',
    primary_object_mass: 260,
    primary_object_manoeuvrable: 'Yes',
    secondary_object_common_name: 'Cosmos-2251 Debris',
    secondary_object_norad_id: '33753',
    secondary_object_licensing_country: 'RU',
    secondary_object_type: 'Debris',
    secondary_object_mission: 'N/A',
    secondary_object_mass: 5,
    secondary_object_manoeuvrable: 'No',
    press_attention_addition: 'This conjunction involves a UK-licensed satellite and requires immediate attention.',
    miss_distance: 1000,
    impact_speed: 1000,
    altitude: 1000,
    latitude: 1000,
    longitude: 1000,
    predicted_fragments: 1000,
    increase_in_future_collisions: 1000,
    immediate_impact_addition: 'This is a test immediate impact addition',
    uk_response_addition: 'This is a test UK response addition',
  },
  withPlaceholders: false,
};

export default ConjunctionClosedownEmail;
