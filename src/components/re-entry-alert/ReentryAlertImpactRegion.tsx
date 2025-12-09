import { useTranslations } from 'next-intl';

import type { TypeOverflightProbability } from '@/__generated__/data-contracts';
import { Regions } from '@/utils/Regions';

import { ReentryAlertImpactTable } from './tables/ReentryAlertImpactTable';

type ReentryAlertImpactRegionProps = {
  england?: Record<string, TypeOverflightProbability> | null;
  ireland?: Record<string, TypeOverflightProbability> | null;
  wales?: Record<string, TypeOverflightProbability> | null;
  scotland?: Record<string, TypeOverflightProbability> | null;
  dataPdf?: string;
};

const ReentryAlertImpactRegion = ({ england, ireland, wales, scotland, dataPdf }: ReentryAlertImpactRegionProps) => {
  const t = useTranslations('Tables.Reentry_alert_impact');

  return (
    <div data-pdf={dataPdf}>
      {england && <ReentryAlertImpactTable caption={Regions.ENGLAND.name} impact={england} byRegion="England" />}
      {ireland && <ReentryAlertImpactTable caption={Regions.NORTHERN_IRELAND.name} impact={ireland} byRegion="Northern Ireland" />}
      {wales && <ReentryAlertImpactTable caption={Regions.WALES.name} impact={wales} byRegion="Wales" />}
      {scotland && <ReentryAlertImpactTable caption={Regions.SCOTLAND.name} impact={scotland} byRegion="Scotland" />}
      {t.rich('see_further_information', { link: chunks => <a href="#further_information" className="govuk-link">{chunks}</a> })}
    </div>
  );
};

export { ReentryAlertImpactRegion };
