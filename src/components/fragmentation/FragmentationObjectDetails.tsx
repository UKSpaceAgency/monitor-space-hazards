import { getSatellite } from '@/actions/getSatellite';

import { FragmentationObjectDetailsTable } from './tables/FragmentationObjectDetails';

type FragmentationObjectDetailsProps = {
  noradId: string;
  dataPdf?: string;
};

const FragmentationObjectDetails = async ({ noradId, dataPdf }: FragmentationObjectDetailsProps) => {
  const object = await getSatellite(noradId);
  return (
    <div data-pdf={dataPdf}>
      <FragmentationObjectDetailsTable object={object} />
    </div>
  );
};

export { FragmentationObjectDetails };
