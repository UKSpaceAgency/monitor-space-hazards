import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Tailwind,
} from '@react-email/components';
import { createTranslator } from 'next-intl';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import messages from '@/locales/en.json';

import { Footer } from './_components/footer';
import { Header } from './_components/header';
import { Map } from './_components/map';
import { AffectedRegions } from './_components/re-entry-closedown/affected-regions';
import { EventInformation } from './_components/re-entry-closedown/event-information';
import { EventSummary } from './_components/re-entry-closedown/event-summary';
import { PressAttention } from './_components/re-entry-closedown/press-attention';
import { Section } from './_components/section';
import { Subheader } from './_components/subheader';

type ReEntryEmailProps = {
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
};

function ReEntryEmail({ event, report }: ReEntryEmailProps) {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Reentry',
    messages,
  });

  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className="bg-white font-sans p-4">
          <Preview>{t('title', { objectName: 'Reentry' })}</Preview>
          <Container>
            <Header
              title="Re-entry Close Down Alert"
              subtitle="Rocket BODY Satellite"
            />
            <Subheader />
            <Section title="Event Summary">
              <EventSummary event={event} className="mb-4" />
              <Map src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" className="mb-4" />
              <AffectedRegions report={report} className="mb-4" />
            </Section>
            <Section title="Additional Information">
              <EventInformation event={event} />
              <PressAttention pressAttention={event.pressAttention} />
            </Section>
            <Footer />
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

ReEntryEmail.PreviewProps = {
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
};

export default ReEntryEmail;
