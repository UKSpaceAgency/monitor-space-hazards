import { useTranslations } from 'next-intl';

import type { TypeOverflightProbability } from '@/__generated__/data-contracts';

import { ReentryAlertImpactTable } from './tables/ReentryAlertImpactTable';

type ReentryAlertImpactOverseasProps = {
  impact: Record<string, TypeOverflightProbability>;
  dataPdf?: string;
};

const ReentryAlertImpactOverseas = ({ impact, dataPdf }: ReentryAlertImpactOverseasProps) => {
  const t = useTranslations('Tables.Reentry_alert_impact');

  return (
    <div data-pdf={dataPdf}>
      <ReentryAlertImpactTable impact={impact} byRegion="British Overseas Territories and Crown Dependencies" />
      <p className="govuk-body">{t('overseas_hint')}</p>
      {t.rich('see_further_information', { link: chunks => <a href="#further_information" className="govuk-link">{chunks}</a> })}
    </div>
  );
};

export { ReentryAlertImpactOverseas };
