import { Section } from '@react-email/components';
import type { RichTranslationValues } from 'next-intl';
import { createTranslator } from 'next-intl';

import type { TypeReentryEventOut, TypeRisk } from '@/__generated__/data-contracts';
import { objectTypeIndex, renderRiskTag } from '@/emails/_utils/utils';
import { dayjs, FORMAT_FULL_DATE_TIME_WITH_UTC } from '@/libs/Dayjs';
import { env } from '@/libs/Env';
import messages from '@/locales/en.json';
import { roundedPercentage } from '@/utils/Math';
import { getFullCountry } from '@/utils/Regions';

import { Link } from '../link';
import { Markdown } from '../markdown';
import { Text } from '../text';

type ReentryEventInformationClosedProps = {
  event: TypeReentryEventOut;
};

export const ReentryEventInformationClosed = ({ event }: ReentryEventInformationClosedProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Reentry_alert.Event_information',
    messages,
  });

  const contentVariables: RichTranslationValues = {
    commonName: event?.objectName ?? 'an unknown object',
    objectType: event?.objectType ? `${event.objectName} ${objectTypeIndex[event.objectType as keyof typeof objectTypeIndex] ?? ''}` : '',
    date: `${dayjs(event.decayEpoch).format(FORMAT_FULL_DATE_TIME_WITH_UTC)} +/- ${event.uncertaintyWindow} minute(s)`,
    riskLevel: event?.atmosphericRisk ?? 'Low',
    riskProbability: roundedPercentage(event?.atmosphericProbability ?? 0),
    licensingCountry: getFullCountry(event.licenseCountry),
    objectUrl: chunks => <Link href={`${env.NEXTAUTH_URL}/re-entries/${event.shortId}/alert`}>{chunks}</Link>,
    tag: chunks => renderRiskTag(chunks as TypeRisk),
    p: chunks => <Text>{chunks}</Text>,
  };

  return (
    <Section>
      <Text className="text-sm m-0 font-bold">{t('title')}</Text>
      {t.rich('content_closed', contentVariables)}
      {event?.executiveSummaryComment
      && (
        <Markdown>
          {event.executiveSummaryComment}
        </Markdown>
      )}
    </Section>
  );
};
