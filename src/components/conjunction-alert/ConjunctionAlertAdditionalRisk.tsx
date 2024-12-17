import { getTranslations } from 'next-intl/server';

import { getConjunctionEventAdditionalRisk } from '@/actions/getConjunctionEventAdditionalRisk';

import { ConjunctionAlertAdditionalRiskTable } from './data-table/ConjunctionAlertAdditionalRiskTable';

const ConjunctionAlertAdditionalRisk = async ({ presignedUrl }: { presignedUrl: string }) => {
  const t = await getTranslations('Conjunction_alert.Additional_risk_to_objects');

  const data = await getConjunctionEventAdditionalRisk(presignedUrl);

  return (
    <div>
      {t.rich('content')}
      <div className="overflow-auto max-h-[500px]">
        <ConjunctionAlertAdditionalRiskTable data={data} />
      </div>
    </div>
  );
};

export { ConjunctionAlertAdditionalRisk };
