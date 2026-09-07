import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import type { TypeOverflightProbability, TypeReentryEventReportOut } from '@/__generated__/data-contracts';

import { ReentryAlertImpactTable } from './tables/ReentryAlertImpactTable';

type ReentryAlertImpactNationProps = {
  impact: Record<string, TypeOverflightProbability>;
  report?: TypeReentryEventReportOut;
  dataPdf?: string;
};

const ReentryAlertImpactNation = ({ report, impact, dataPdf }: ReentryAlertImpactNationProps) => {
  const t = useTranslations('Tables.Reentry_alert_impact');

  const nationImpact = useMemo(() => {
    const result = impact;
    if (report) {
      result.united_kingdom = {
        atmospheric_probability: report.atmospheric_probability,
        fragments_probability: report.fragments_probability,
        human_casualty_probability: report.human_casualty_probability,
        overflight_time: report.overflight_time,
        atmospheric_risk: report.atmospheric_risk,
        fragments_risk: report.fragments_risk,
        human_casualty_risk: report.human_casualty_risk,
      };
    }
    return result;
  }, [report, impact]);

  return (
    <div data-pdf={dataPdf}>
      {nationImpact.toString()}
      <ReentryAlertImpactTable impact={nationImpact} byRegion="UK nation" isNation />
      {t.rich('see_further_information', { link: chunks => <a href="#further_information" className="govuk-link">{chunks}</a> })}
    </div>
  );
};

export { ReentryAlertImpactNation };
