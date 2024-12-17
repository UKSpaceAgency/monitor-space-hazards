import { useTranslations } from 'next-intl';

import type { TypeOverflightProbability } from '@/__generated__/data-contracts';
import { Regions } from '@/utils/Regions';

import { ReentryAlertImpactTable } from './tables/ReentryAlertImpactTable';

type ReentryAlertImpactRegionProps = {
  england?: Record<string, TypeOverflightProbability> | null;
  ireland?: Record<string, TypeOverflightProbability> | null;
  wales?: Record<string, TypeOverflightProbability> | null;
  scotland?: Record<string, TypeOverflightProbability> | null;
};

const ReentryAlertImpactRegion = ({ england, ireland, wales, scotland }: ReentryAlertImpactRegionProps) => {
  const t = useTranslations('Tables.Reentry_alert_impact');

  return (
    <div>
      {england && <ReentryAlertImpactTable caption={Regions.ENGLAND.name} impact={england} />}
      {ireland && <ReentryAlertImpactTable caption={Regions.NORTHERN_IRELAND.name} impact={ireland} />}
      {wales && <ReentryAlertImpactTable caption={Regions.WALES.name} impact={wales} />}
      {scotland && <ReentryAlertImpactTable caption={Regions.SCOTLAND.name} impact={scotland} />}
      <p className="govuk-body">{t('uk_nations_hint')}</p>
      {t.rich('see_further_information', { link: chunks => <a href="#further_information" className="govuk-link">{chunks}</a> })}

    </div>
  );
};

export { ReentryAlertImpactRegion };
