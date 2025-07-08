import { createTranslator } from 'next-intl';

import type { TypeConjunctionReportOut } from '@/__generated__/data-contracts';
import { env } from '@/libs/Env';
import messages from '@/locales/en.json';

import { ConjunctionAdditionalEventDetails } from './_components/conjunction/additional-event-details';
import { ConjunctionEventSummary } from './_components/conjunction/event-summary';
import { ConjunctionPotentialImpact } from './_components/conjunction/potential-impact';
import { ConjunctionPressAttention } from './_components/conjunction/press-attention';
import { ConjunctionRecommendedActions } from './_components/conjunction/recommended-actions';
import { Layout } from './_components/layout';
import { Section } from './_components/section';
import { SignIn } from './_components/sign_in';
import { Subheader } from './_components/subheader';

type ConjunctionEmailProps = {
  report: TypeConjunctionReportOut;
  withPlaceholders: boolean;
};

function ConjunctionEmail({ report, withPlaceholders }: ConjunctionEmailProps) {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Conjunction_alert',
    messages,
  });

  const eventLink = `${env.NEXTAUTH_URL}/conjunctions/${report.shortId}/alert`;

  return (
    <Layout
      title={t('title', { risk: report.risk })}
      subtitle={`${report.primaryObjectCommonName} vs ${report.secondaryObjectCommonName}`}
      withPlaceholders={withPlaceholders}
    >
      <Subheader risk={report.risk} />
      <Section title={t('event_summary_title')}>
        <ConjunctionEventSummary eventUrl={eventLink} report={report} className="pb-6" />
      </Section>
      <Section title={t('additional_event_details_title')}>
        <ConjunctionAdditionalEventDetails report={report} className="pb-6" />
      </Section>
      <Section title={t('potential_impact_title')}>
        <ConjunctionPotentialImpact report={report} />
        <ConjunctionRecommendedActions report={report} />
        <ConjunctionPressAttention pressAttention={report.pressAttentionAddition} />
      </Section>
      <SignIn link={eventLink} />
    </Layout>
  );
}

ConjunctionEmail.PreviewProps = {
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

export default ConjunctionEmail;
