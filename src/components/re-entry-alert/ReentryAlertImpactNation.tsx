import { useTranslations } from 'next-intl';

import type { TypeOverflightProbability } from '@/__generated__/data-contracts';

import { ReentryAlertImpactTable } from './tables/ReentryAlertImpactTable';

type ReentryAlertImpactNationProps = {
  impact: Record<string, TypeOverflightProbability>;
  dataPdf?: string;
};

const ReentryAlertImpactNation = ({ impact, dataPdf }: ReentryAlertImpactNationProps) => {
  const t = useTranslations('Tables.Reentry_alert_impact');

  return (
    <div data-pdf={dataPdf}>
      <ReentryAlertImpactTable impact={impact} byRegion="UK nation" isNation />
      {t.rich('see_further_information', { link: chunks => <a href="#further_information" className="govuk-link">{chunks}</a> })}
    </div>
  );
};

export { ReentryAlertImpactNation };
