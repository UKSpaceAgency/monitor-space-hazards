import { getTranslations } from 'next-intl/server';

import { getFragmentationEventGabbardData } from '@/actions/getFragmentationEventGabbardData';
import { Details } from '@/ui/details/details';

import { GabbardPlotChart } from './charts/GabbardPlotChart';

type ActualFragmentDataProps = {
  shortId: string;
  knownFragments: number;
  modelledFragments: number;
  dataPdf: string;
};

const ActualFragmentData = async ({ shortId, modelledFragments, knownFragments, dataPdf }: ActualFragmentDataProps) => {
  const t = await getTranslations('Fragmentation.Fragment_data');

  const gabbardData = await getFragmentationEventGabbardData(shortId);

  const dates = Array.from(gabbardData.keys()).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div data-pdf={dataPdf}>
      {t.rich('content', { knownFragments, modelledFragments })}
      <div className="bg-lightGrey p-8 mb-4">
        <GabbardPlotChart dates={dates} gabbardData={gabbardData} />
        <Details
          summary={t('help.title')}
          className="mb-0"
        >
          {t.rich('help.content')}
        </Details>
      </div>
    </div>
  );
};

export { ActualFragmentData };
