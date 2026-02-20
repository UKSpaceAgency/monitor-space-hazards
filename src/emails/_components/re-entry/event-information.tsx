import { Section } from '@react-email/components';
import type { RichTranslationValues } from 'next-intl';
import { createTranslator } from 'next-intl';

import type { TypeReentryEventOut, TypeRisk } from '@/__generated__/data-contracts';
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
    commonName: event?.object_name ?? 'Unknown',
    objectType: event?.object_type ? objectTypeIndex[event.object_type as keyof typeof objectTypeIndex] ?? '' : '',
    date: `${dayjs(event.decay_epoch).format(FORMAT_FULL_DATE_TIME_WITH_UTC)} +/- ${event.uncertainty_window} minute(s)`,
    riskLevel: event?.atmospheric_risk ?? 'Low',
    riskProbability: roundedPercent(event?.atmospheric_probability ?? 0),
    fragmentsRisk: event?.fragments_risk ?? 'Low',
    fragmentsProbability: roundedPercent(event?.fragments_probability ?? 0),
    licensingCountry: getFullCountry(event.license_country),
    objectUrl: chunks => <Link href={`${env.NEXTAUTH_URL}/re-entries/${event.short_id}/alert`}>{chunks}</Link>,
    tag: chunks => renderRiskTag(chunks as TypeRisk),
    p: chunks => <Text>{chunks}</Text>,
    b: chunks => <b>{chunks}</b>,
  };

  return (
    <Section>
      <Text className="text-sm m-0 font-bold">{t('title')}</Text>
      {t.rich('content', contentVariables)}
      {event?.executive_summary_comment
      && (
        <Markdown>
          {event.executive_summary_comment}
        </Markdown>
      )}
    </Section>
  );
};
