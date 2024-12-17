import Api from '@/libs/Api';

export default async function getConjunctionUniqueEvent(shortId: string) {
  const { data } = await Api.getConjunctionEventsUniqueEventShortId(shortId);
  return data;
}
