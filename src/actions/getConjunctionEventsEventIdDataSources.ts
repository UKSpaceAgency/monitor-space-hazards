import type { TypeEventDataSource, TypeGetConjunctionEventsEventIdDataSourcesParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

export type TypeDataSourcesOut = {
  space_track_cdm: TypeEventDataSource[];
  uksa_analysis: TypeEventDataSource[];
};

export async function getConjunctionEventsEventIdDataSources(
  query: TypeGetConjunctionEventsEventIdDataSourcesParams,
): Promise<TypeDataSourcesOut> {
  const { data } = await Api.getConjunctionEventsEventIdDataSources(query);
  return data as TypeDataSourcesOut;
}
