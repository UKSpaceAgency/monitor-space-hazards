'use server';

import { getManoeuvrePlots } from './getManoeuvrePlots';

export async function getManoeuvrePlotShortId(short_id: string) {
  const plots = await getManoeuvrePlots();
  const plot = plots.find(plot => plot.event_short_id === short_id);
  return plot;
};
