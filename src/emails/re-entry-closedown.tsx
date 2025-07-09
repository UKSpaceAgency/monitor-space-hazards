import { createTranslator } from 'next-intl';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import { env } from '@/libs/Env';
import messages from '@/locales/en.json';

import { Layout } from './_components/layout';
import { Map } from './_components/map';
import { ReentryAffectedRegions } from './_components/re-entry/affected-regions';
import { ReentryEventInformationClosed } from './_components/re-entry/event-information-closed';
import { ReentryEventSummary } from './_components/re-entry/event-summary';
import { ReentryHandlingSpaceDebris } from './_components/re-entry/handling-space-debris';
import { ReentryPressAttention } from './_components/re-entry/press-attention';
import { Section } from './_components/section';
import { SignIn } from './_components/sign_in';
import { Subheader } from './_components/subheader';

type ReEntryEmailProps = {
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
  withPlaceholders: boolean;
};

function ReEntryClosedownEmail({ event, report, withPlaceholders }: ReEntryEmailProps) {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Reentry_alert',
    messages,
  });

  const eventLink = `${env.NEXTAUTH_URL}/re-entries/${event.shortId}/alert`;

  return (
    <Layout
      title="Re-entry Close Down Alert"
      subtitle="Rocket BODY Satellite"
      withPlaceholders={withPlaceholders}
    >
      <Subheader />
      <Section title={t('event_summary_title')}>
        <ReentryEventSummary event={event} className="pb-4" />
        <Map src="{{MAP.src}}" className="pb-4" width="580" />
        <ReentryAffectedRegions report={report} className="pb-4" />
      </Section>
      <Section title={t('additional_information_title')}>
        <ReentryEventInformationClosed event={event} />
        <ReentryHandlingSpaceDebris />
        <ReentryPressAttention pressAttention={event.pressAttention} />
        <SignIn link={eventLink} />
      </Section>
    </Layout>
  );
}

ReEntryClosedownEmail.PreviewProps = {
  event: {
    objectName: 'Falcon 9 Second Stage',
    objectType: 'Rocket Body',
    estimatedMass: 4000,
    decayEpoch: '2024-01-20T10:00:00Z',
    uncertaintyWindow: 120,
    overflightTime: ['2024-01-20T09:30:00Z', '2024-01-20T10:30:00Z'],
    monteCarloRisk: 'High',
    monteCarloProbability: 0.85,
    licensedCountry: 'United States',
    shortId: '1234567890',
    noradId: '1234567890',
  },
  report: {
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
