import { getTranslations } from 'next-intl/server';

import type { TypeManoeuvrePlotWithUserMetadataOut } from '@/__generated__/data-contracts';
import { getManoeuvrePlot } from '@/actions/getManoeuvrePlot';
import { getManoeuvrePlotsManoeuvrePlotId } from '@/actions/getManoeuvrePlotsManoeuvrePlotId';

import MtpChart from '../charts/mtp-chart/MtpChart';

type ConjunctionManoeuvreSupportProps = {
  plot: TypeManoeuvrePlotWithUserMetadataOut;
};

const ConjunctionManoeuvreSupport = async ({ plot }: ConjunctionManoeuvreSupportProps) => {
  const t = await getTranslations('Conjunction.Mtp_chart');

  const { data } = await getManoeuvrePlotsManoeuvrePlotId(plot?.id);
  const manoeuvrePlot = await getManoeuvrePlot(data.presignedUrl);

  return <MtpChart manoeuvrePlot={manoeuvrePlot} dataPdf={t('title')} />;
};

export { ConjunctionManoeuvreSupport };
