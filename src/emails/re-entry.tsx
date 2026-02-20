import { createTranslator } from 'next-intl';

import type { TypeReentryEventOut, TypeReentryEventReportOut, TypeTIPOut } from '@/__generated__/data-contracts';
import { env } from '@/libs/Env';
import messages from '@/locales/en.json';

import { Layout } from './_components/layout';
import { Map } from './_components/map';
import { ReentryAffectedRegions } from './_components/re-entry/affected-regions';
import { ReentryEventDetails } from './_components/re-entry/event-details';
import { ReentryEventInformation } from './_components/re-entry/event-information';
import { ReentryEventSummary } from './_components/re-entry/event-summary';
import { ReentryHandlingSpaceDebris } from './_components/re-entry/handling-space-debris';
import { ReentryPressAttention } from './_components/re-entry/press-attention';
import { ReentryRiskProbabilities } from './_components/re-entry/risk-probabilities';
import { Section } from './_components/section';
import { SignIn } from './_components/sign_in';
import { Subheader } from './_components/subheader';
import { Text } from './_components/text';
import { objectTypeIndex } from './_utils/utils';

type ReEntryEmailProps = {
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
  tip: TypeTIPOut;
  withPlaceholders: boolean;
};

function ReEntryEmail({ event, report, tip, withPlaceholders }: ReEntryEmailProps) {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails',
    messages,
  });

  const eventLink = `${env.NEXTAUTH_URL}/re-entries/${event.short_id}/alert`;

  return (
    <Layout
      eventType="re-entry"
      shortId={event.short_id}
      title={t('Reentry_alert.title', { risk: event.fragments_risk, reportNumber: report.report_number })}
      subtitle={`${event.object_name} ${objectTypeIndex[event.object_type as keyof typeof objectTypeIndex] ?? ''}`}
      withPlaceholders={withPlaceholders}
    >
      <Subheader risk={event.fragments_risk} />
      <Section title={t('Reentry_alert.risk_probabilities_title')} className="!w-full">
        <ReentryRiskProbabilities event={event} className="!w-full" />
      </Section>
      <Section title={t('Reentry_alert.event_summary_title')}>
        <ReentryEventSummary event={event} tip={tip} className="pb-6" />
        {event.overflight_time.length > 0 && <Map src="{{MAP.src}}" className="pb-6" showLegend={false} />}
        <Map src="{{WORLD_MAP.src}}" />
      </Section>
      <Section title={t('Reentry_alert.regions_at_risk_title')}>
        <ReentryAffectedRegions report={report} />
      </Section>
      <Section title={t('Reentry_alert.event_details_title')}>
        <ReentryEventDetails event={event} report={report} className="pb-4" />
        <Text className="mb-0">{t('utc_note')}</Text>
      </Section>
      <Section title={t('Reentry_alert.additional_information_title')}>
        <ReentryEventInformation event={event} />
        <ReentryHandlingSpaceDebris event={event} />
        <ReentryPressAttention pressAttention={event.press_attention_comment} />
        <SignIn link={eventLink} />
      </Section>
    </Layout>
  );
}

ReEntryEmail.PreviewProps = {
  pageUrl: 'https://www.dev.monitor-space-hazards.service.gov.uk',
  tip: {
    direction: 'ascending',
  },
  event: {
    object_name: 'Falcon 9 Second Stage',
    object_type: 'ROCKET BODY',
    estimated_mass: 4000,
    decay_epoch: '2024-01-20T10:00:00Z',
    uncertainty_window: 120,
    overflight_time: ['2024-01-20T09:30:00Z', '2024-01-20T10:30:00Z'],
    atmospheric_risk: 'High',
    atmospheric_probability: 0.85,
    fragments_risk: 'High',
    fragments_probability: 0.85,
    licensed_country: 'United States',
    short_id: '1234567890',
    norad_id: '1234567890',
    uk_response_comment: 'Recovery and clean up',
    press_attention_comment: 'Press attention',
    executive_summary_comment: 'Executive summary',
  },
  report: {
    impact: {
      by_nation: {
        england_nation: { fragments_probability: 0.6, overflight_time: ['2024-01-20T09:30:00Z'] },
        scotland_nation: { fragments_probability: 0.3, overflight_time: ['2024-01-20T09:45:00Z'] },
        wales_nation: { fragments_probability: 0.2, overflight_time: ['2024-01-20T10:00:00Z'] },
      },
      overseas_territories_and_crown_dependencies: {},
      maritime_and_airspace: {
        south_georgia_and_the_south_sandwich_islands: { fragments_probability: 0.8, overflight_time: ['2024-01-20T09:20:00Z'] },
        turks_and_caicos_islands: { fragments_probability: 0.6, overflight_time: ['2024-01-20T09:25:00Z'] },
      },
    },
  },
  withPlaceholders: false,
};

export default ReEntryEmail;
