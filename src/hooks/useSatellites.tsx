import { useInfiniteQuery } from '@tanstack/react-query';

import type { TypeReadSatellitesWithMetadataV1SatellitesWithMetadataGetParams, TypeSatelliteWithMetadataOut } from '@/__generated__/data-contracts';
import { getSatellites } from '@/actions/getSatellites';

type UseSatellitesProps = {
  initialData: TypeSatelliteWithMetadataOut[];
  params: TypeReadSatellitesWithMetadataV1SatellitesWithMetadataGetParams;
};

export default function useSatellites({ initialData, params: { limit = 100, ...params } }: UseSatellitesProps) {
  return useInfiniteQuery({
    queryKey: ['satellites', params],
    queryFn: async ({ pageParam }) => {
      return await getSatellites({ ...params, limit, offset: pageParam });
    },
    initialPageParam: 0,
    initialData: { pages: [{ data: initialData }], pageParams: [0] },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.data.length < limit) {
        return undefined;
      }
      return lastPageParam + lastPage.data.length;
    },
    placeholderData: prev => prev,
  });
}
