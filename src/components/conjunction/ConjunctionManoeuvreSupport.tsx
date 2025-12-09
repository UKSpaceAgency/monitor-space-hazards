import { getTranslations } from 'next-intl/server';

import type { TypeManoeuvrePlotMetadataOut } from '@/__generated__/data-contracts';
import { getManoeuvrePlot } from '@/actions/getManoeuvrePlot';
import { getManoeuvrePlotsManoeuvrePlotId } from '@/actions/getManoeuvrePlotsManoeuvrePlotId';
import ErrorMessage from '@/ui/error-message/error-message';

import MtpChart from '../charts/mtp-chart/MtpChart';

type ConjunctionManoeuvreSupportProps = {
  plot: TypeManoeuvrePlotMetadataOut;
};

const ConjunctionManoeuvreSupport = async ({ plot }: ConjunctionManoeuvreSupportProps) => {
  const t = await getTranslations('Conjunction.Mtp_chart');

  try {
    const { data } = await getManoeuvrePlotsManoeuvrePlotId(plot?.id);
    const manoeuvrePlot = await getManoeuvrePlot(data.presignedUrl);

    return <MtpChart manoeuvrePlot={manoeuvrePlot} dataPdf={t('title')} />;
  } catch {
    return <ErrorMessage>Something went wrong</ErrorMessage>;
  }
};

export { ConjunctionManoeuvreSupport };
