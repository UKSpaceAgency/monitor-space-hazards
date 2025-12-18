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

  const eventLink = `${env.NEXTAUTH_URL}/conjunctions/${report.shortId}/alert`;

  return (
    <Layout
      title={t('Conjunction_alert.title_closed', { reportNumber: report.reportNumber })}
      subtitle={`${report.primaryObjectCommonName} vs ${report.secondaryObjectCommonName}`}
      withPlaceholders={withPlaceholders}
    >
      <Subheader comment={event.closedComment} />
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
    createdAt: '2024-01-20T08:00:00Z',
    updatedAt: '2024-01-20T08:00:00Z',
    shortId: 'CONJ-2024-001',
    reportNumber: 1,
    reportTime: '2024-01-20T08:00:00Z',
    risk: 'Low',
    alertType: ['priority', 'uk-licensed'],
    tcaTime: '2024-01-20T10:30:00Z',
    collisionProbability: 0.85,
    manoeuvreExpected: 'Likely',
    manoeuvreAddition: 'Primary object will perform avoidance manoeuvre',
    primaryObjectCommonName: 'Starlink-1234',
    primaryObjectNoradId: '12345',
    primaryObjectLicensingCountry: 'GB',
    primaryObjectType: 'Communication',
    primaryObjectMission: 'Broadband Internet',
    primaryObjectMass: 260,
    primaryObjectManoeuvrable: 'Yes',
    secondaryObjectCommonName: 'Cosmos-2251 Debris',
    secondaryObjectNoradId: '33753',
    secondaryObjectLicensingCountry: 'RU',
    secondaryObjectType: 'Debris',
    secondaryObjectMission: 'N/A',
    secondaryObjectMass: 5,
    secondaryObjectManoeuvrable: 'No',
    pressAttentionAddition: 'This conjunction involves a UK-licensed satellite and requires immediate attention.',
    missDistance: 1000,
    impactSpeed: 1000,
    altitude: 1000,
    latitude: 1000,
    longitude: 1000,
    predictedFragments: 1000,
    increaseInFutureCollisions: 1000,
    immediateImpactAddition: 'This is a test immediate impact addition',
    ukResponseAddition: 'This is a test UK response addition',
  },
  withPlaceholders: false,
};

export default ConjunctionClosedownEmail;
