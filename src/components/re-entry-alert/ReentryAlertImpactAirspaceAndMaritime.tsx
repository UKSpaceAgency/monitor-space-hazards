import { useTranslations } from 'next-intl';

import type { TypeOverflightProbability } from '@/__generated__/data-contracts';

import { ReentryAlertImpactTable } from './tables/ReentryAlertImpactTable';

type ReentryAlertImpactAirspaceAndMaritimeProps = {
  impact: Record<string, TypeOverflightProbability>;
  dataPdf?: string;
};

const ReentryAlertImpactAirspaceAndMaritime = ({ impact, dataPdf }: ReentryAlertImpactAirspaceAndMaritimeProps) => {
  const t = useTranslations('Tables.Reentry_alert_impact');

  return (
    <div data-pdf={dataPdf}>
      <ReentryAlertImpactTable impact={impact} label="Potential impact by Airspace and Maritime" />
      <p className="govuk-body">{t('extra_information')}</p>
      {t.rich('see_further_information', { link: chunks => <a href="#further_information" className="govuk-link">{chunks}</a> })}
    </div>
  );
};

export { ReentryAlertImpactAirspaceAndMaritime };
