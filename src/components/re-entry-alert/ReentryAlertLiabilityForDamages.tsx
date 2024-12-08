import { useTranslations } from 'next-intl';

import { getFullCountry } from '@/utils/Regions';

import { Markdown } from '../Markdown';

type ReentryAlertLiabilityForDamagesProps = {
  licenseCountry?: string | null;
  damagesLiability?: string | null;
};

const ReentryAlertLiabilityForDamages = ({ licenseCountry, damagesLiability }: ReentryAlertLiabilityForDamagesProps) => {
  const t = useTranslations('ReentryAlert.LiabilityForDamages');
  return (
    <div>
      {t.rich('content', { licenseCountry: getFullCountry(licenseCountry) ?? t('licenseCountryEmpty') })}
      {damagesLiability && <Markdown>{damagesLiability}</Markdown>}
    </div>
  );
};

export { ReentryAlertLiabilityForDamages };
