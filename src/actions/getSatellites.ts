'use server';

import type { TypeGetSatellitesWithMetadataParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getSatellites(params: TypeGetSatellitesWithMetadataParams) {
  const { data } = await Api.getSatellitesWithMetadata(params);
  return data;
};
