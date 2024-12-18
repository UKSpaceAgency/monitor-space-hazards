import { useTranslations } from 'next-intl';

import type { TypeConjunctionReportOut } from '@/__generated__/data-contracts';

import { ConjunctionAlertAdditionalEventDetailsTable } from './tables/ConjunctionAlertAdditionalEventDetailsTable';

const ConjunctionAlertAdditionalEventDetails = ({ report, dataPdf }: { report: TypeConjunctionReportOut; dataPdf?: string }) => {
  const t = useTranslations('Conjunction_alert.Additional_event_details');

  return (
    <div data-pdf={dataPdf}>
      <ConjunctionAlertAdditionalEventDetailsTable report={report} />
      {t.rich('see_further_information', { link: chunks => <a href="#further_information" className="govuk-link">{chunks}</a> })}
    </div>
  );
};

export { ConjunctionAlertAdditionalEventDetails };
