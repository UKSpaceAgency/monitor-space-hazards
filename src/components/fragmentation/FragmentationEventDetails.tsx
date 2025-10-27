import { useTranslations } from 'next-intl';

import type { TypeFragmentationEvent, TypeFragmentationReport } from '@/__generated__/data-contracts';

import { GabbardPlotChart } from './charts/GabbardPlotChart';
import { FragmentationEventDetailsTable } from './tables/FragmentationEventDetailsTable';

type FragmentationEventDetailsProps = {
  event: TypeFragmentationEvent;
  report: TypeFragmentationReport;
};

const FragmentationEventDetails = ({ report }: FragmentationEventDetailsProps) => {
  const t = useTranslations('Fragmentation.Event_details');
  return (
    <div>

      <FragmentationEventDetailsTable report={report} />
      <h3 className="govuk-heading-m">{t('actual_fragment_data')}</h3>
      {t.rich('actual_fragment_data_content', { fragments: report.modelled_fragments })}
      <GabbardPlotChart />
    </div>
  );
};

export { FragmentationEventDetails };
