'use server';

import type { TypeReadSatellitesWithMetadataV1SatellitesWithMetadataGetParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export async function getSatellites(params: TypeReadSatellitesWithMetadataV1SatellitesWithMetadataGetParams) {
  const { data } = await Api.readSatellitesWithMetadataV1SatellitesWithMetadataGet(params);
  return { data };
};
