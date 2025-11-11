import { getTranslations } from 'next-intl/server';

import { getFragmentationEventScreeningResults } from '@/actions/getFragmentationEventScreeningResults';
import Details from '@/ui/details/details';

import { FragmentationAdditionalRiskTable } from './tables/FragmentationAdditionalRiskTable';

const FragmentationAdditionalRisk = async ({ presignedUrl, dataPdf }: { presignedUrl: string; dataPdf?: string }) => {
  const t = await getTranslations('Fragmentation.Additional_risk');

  const data = await getFragmentationEventScreeningResults(presignedUrl);

  return (
    <div data-pdf={dataPdf}>
      {t.rich('content')}
      <div className="overflow-auto max-h-[500px] mb-4">
        <FragmentationAdditionalRiskTable data={data} />
      </div>
      <Details summary={t.rich('help.title')}>
        {t.rich('help.content')}
      </Details>
    </div>
  );
};

export { FragmentationAdditionalRisk };
