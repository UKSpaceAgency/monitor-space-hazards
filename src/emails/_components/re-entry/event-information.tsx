import { Section } from '@react-email/components';
import type { RichTranslationValues } from 'next-intl';
import { createTranslator } from 'next-intl';

import type { TypeReentryEventOut, TypeReentryRisk } from '@/__generated__/data-contracts';
import { renderRiskTag } from '@/emails/_utils/utils';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import { env } from '@/libs/Env';
import messages from '@/locales/en.json';
import { roundedPercentage } from '@/utils/Math';
import { getFullCountry } from '@/utils/Regions';

import { Link } from '../link';
import { Text } from '../text';

type ReentryEventInformationProps = {
  event: TypeReentryEventOut;
};

export const ReentryEventInformation = ({ event }: ReentryEventInformationProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Reentry_alert.Event_information',
    messages,
  });

  const contentVariables: RichTranslationValues = {
    commonName: event?.objectName ?? 'Unknown',
    objectType: event?.objectType,
    date: `${dayjs(event.decayEpoch).format(FORMAT_FULL_DATE_TIME)} +/- ${event.uncertaintyWindow} minute(s)`,
    riskLevel: event?.monteCarloRisk ?? 'Low',
    riskProbability: roundedPercentage(event?.monteCarloProbability ?? 0),
    fragmentsRisk: event?.fragmentsRisk ?? 'Low',
    fragmentsProbability: roundedPercentage(event?.fragmentsProbability ?? 0),
    licensingCountry: getFullCountry(event.licenseCountry),
    objectUrl: chunks => <Link href={`${env.NEXTAUTH_URL}/satellites/${event.noradId}`}>{chunks}</Link>,
    tag: chunks => renderRiskTag(chunks as TypeReentryRisk),
    p: chunks => <Text>{chunks}</Text>,
    b: chunks => <b>{chunks}</b>,
  };

  return (
    <Section>
      <Text className="text-sm m-0 font-bold">{t('title')}</Text>
      {t.rich('content', contentVariables)}
    </Section>
  );
};
