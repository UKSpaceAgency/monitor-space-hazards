import { useTranslations } from 'next-intl';

import { getFullCountry } from '@/utils/Regions';

import { Markdown } from '../Markdown';

type ReentryAlertLiabilityForDamagesProps = {
  licenseCountry?: string | null;
  damagesLiabilityComment?: string | null;
  dataPdf?: string;
};

const ReentryAlertLiabilityForDamages = ({ licenseCountry, damagesLiabilityComment, dataPdf }: ReentryAlertLiabilityForDamagesProps) => {
  const t = useTranslations('Reentry_alert.Liability_for_damages');
  return (
    <div data-pdf={dataPdf}>
      {t.rich('content', { licenseCountry: getFullCountry(licenseCountry) ?? t('licenseCountryEmpty') })}
      {damagesLiabilityComment && <Markdown>{damagesLiabilityComment}</Markdown>}
    </div>
  );
};

export { ReentryAlertLiabilityForDamages };
