import type { TypeGetConjunctionEventsEventIdSummaryParams } from '@/__generated__/data-contracts';
import type { RequestParams } from '@/__generated__/http-client';
import Api from '@/libs/Api';

export async function getConjunctionEvent(
  query: TypeGetConjunctionEventsEventIdSummaryParams,
  params: RequestParams = {},
) {
  const { data } = await Api.getConjunctionEventsEventIdSummary(query, params);

  const event = data.find(event => event.short_id === query.eventId);

  const spacetrack = data.find(event => event.data_source === 'Space-Track CDM');
  const uksa = data.find(event => event.data_source === 'UKSA Analysis');

  if (!event) {
    throw new Error('Event doesn\'t exist!');
  }

  return {
    event,
    spacetrack,
    uksa,
  };
}
