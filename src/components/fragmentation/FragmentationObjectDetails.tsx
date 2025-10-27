import type { TypeFragmentationReport } from '@/__generated__/data-contracts';

import { FragmentationObjectDetailsTable } from './tables/FragmentationObjectDetails';

type FragmentationObjectDetailsProps = {
  report: TypeFragmentationReport;
};

const FragmentationObjectDetails = async ({ report }: FragmentationObjectDetailsProps) => {
  return (
    <div>
      <FragmentationObjectDetailsTable report={report} />
    </div>
  );
};

export { FragmentationObjectDetails };
