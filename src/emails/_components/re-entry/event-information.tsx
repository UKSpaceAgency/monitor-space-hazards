import { Section } from '@react-email/components';
import type { RichTranslationValues } from 'next-intl';
import { createTranslator } from 'next-intl';

import type { TypeReentryEventOut, TypeReentryRisk } from '@/__generated__/data-contracts';
import { objectTypeIndex, renderRiskTag } from '@/emails/_utils/utils';
import { dayjs, FORMAT_FULL_DATE_TIME_WITH_UTC } from '@/libs/Dayjs';
import { env } from '@/libs/Env';
import messages from '@/locales/en.json';
import { roundedPercent } from '@/utils/Math';
import { getFullCountry } from '@/utils/Regions';

import { Link } from '../link';
import { Markdown } from '../markdown';
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
    objectType: event?.objectType ? objectTypeIndex[event.objectType as keyof typeof objectTypeIndex] ?? '' : '',
    date: `${dayjs(event.decayEpoch).format(FORMAT_FULL_DATE_TIME_WITH_UTC)} +/- ${event.uncertaintyWindow} minute(s)`,
    riskLevel: event?.atmosphericRisk ?? 'Low',
    riskProbability: roundedPercent(event?.atmosphericProbability ?? 0),
    fragmentsRisk: event?.fragmentsRisk ?? 'Low',
    fragmentsProbability: roundedPercent(event?.fragmentsProbability ?? 0),
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
      {event?.execSummary
      && (
        <Markdown>
          {event.execSummary}
        </Markdown>
      )}
    </Section>
  );
};
