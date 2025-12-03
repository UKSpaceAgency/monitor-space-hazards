import type { TypeFragmentationReportOut } from '@/__generated__/data-contracts';

import { FragmentationObjectDetailsTable } from './tables/FragmentationObjectDetails';

type FragmentationObjectDetailsProps = {
  report: TypeFragmentationReportOut;
};

const FragmentationObjectDetails = async ({ report }: FragmentationObjectDetailsProps) => {
  return (
    <FragmentationObjectDetailsTable report={report} />
  );
};

export { FragmentationObjectDetails };
