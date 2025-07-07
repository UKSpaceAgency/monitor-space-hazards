import { Section } from '@react-email/components';
import dayjs from 'dayjs';
import type { RichTranslationValues } from 'next-intl';
import { createTranslator } from 'next-intl';

import type { TypeReentryEventOut, TypeReentryRisk } from '@/__generated__/data-contracts';
import { renderRiskTag } from '@/emails/_utils/utils';
import { FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import messages from '@/locales/en.json';
import { roundedPercentage } from '@/utils/Math';
import { getFullCountry } from '@/utils/Regions';

import { Text } from '../text';

type EventInformationProps = {
  event: TypeReentryEventOut;
};

export const EventInformation = ({ event }: EventInformationProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Reentry_alert.Executive_summary',
    messages,
  });

  const contentVariables: RichTranslationValues = {
    commonName: event?.objectName ?? 'Unknown',
    objectType: event?.objectType,
    date: dayjs(event.decayEpoch).format(FORMAT_FULL_DATE_TIME),
    riskLevel: event?.monteCarloRisk ?? 'Low',
    riskProbability: roundedPercentage(event?.monteCarloProbability ?? 0),
    licensingCountry: getFullCountry(event.licenseCountry),
    tag: chunks => renderRiskTag(chunks as TypeReentryRisk),
  };

  return (
    <Section>
      <Text className="text-sm m-0 font-bold">{t('email_title')}</Text>
      <Text>{t.rich('closed_report', contentVariables)}</Text>
    </Section>
  );
};
