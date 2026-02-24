import { getTranslations } from 'next-intl/server';

import { getConjunctionEventAdditionalRisk } from '@/actions/getConjunctionEventAdditionalRisk';

import { ConjunctionAlertAdditionalRiskTable } from './data-table/ConjunctionAlertAdditionalRiskTable';

const ConjunctionAlertAdditionalRisk = async ({ presignedUrl, dataPdf }: { presignedUrl: string; dataPdf?: string }) => {
  const t = await getTranslations('Conjunction_alert.Additional_risk_to_objects');
  const data = await getConjunctionEventAdditionalRisk(presignedUrl);

  return (
    <div data-pdf={dataPdf}>
      {t.rich('content')}
      <div className="overflow-auto max-h-[500px]">
        <ConjunctionAlertAdditionalRiskTable data={data} />
      </div>
    </div>
  );
};

export { ConjunctionAlertAdditionalRisk };
