import { getTranslations } from 'next-intl/server';

import { getFragmentationEventGabbardData } from '@/actions/getFragmentationEventGabbardData';

import { GabbardPlotChart } from './charts/GabbardPlotChart';

type ActualFragmentDataProps = {
  shortId: string;
  modelledFragments: number;
  dataPdf: string;
};

const ActualFragmentData = async ({ shortId, modelledFragments, dataPdf }: ActualFragmentDataProps) => {
  const t = await getTranslations('Fragmentation.Event_details');

  const gabbardData = await getFragmentationEventGabbardData(shortId);

  const dates = Array.from(gabbardData.keys()).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div data-pdf={dataPdf}>
      {t.rich('actual_fragment_data_content', { fragments: modelledFragments })}
      <GabbardPlotChart dates={dates} gabbardData={gabbardData} />
    </div>
  );
};

export { ActualFragmentData };
