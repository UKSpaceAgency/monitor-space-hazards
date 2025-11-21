import { getTranslations } from 'next-intl/server';

import { getFragmentationEventScreeningResults } from '@/actions/getFragmentationEventScreeningResults';
import Details from '@/ui/details/details';

import { Markdown } from '../Markdown';
import { FragmentationAdditionalRiskTable } from './tables/FragmentationAdditionalRiskTable';

type FragmentationAdditionalRiskProps = {
  spaceflightComment?: string | null;
  ukComment?: string | null;
  presignedUrl: string;
  dataPdf?: string;
};

const FragmentationAdditionalRisk = async ({ spaceflightComment, ukComment, presignedUrl, dataPdf }: FragmentationAdditionalRiskProps) => {
  const t = await getTranslations('Fragmentation.Additional_risk');

  const data = await getFragmentationEventScreeningResults(presignedUrl);

  return (
    <div data-pdf={dataPdf}>
      {spaceflightComment && <Markdown>{spaceflightComment}</Markdown>}
      {ukComment && <Markdown>{ukComment}</Markdown>}
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
