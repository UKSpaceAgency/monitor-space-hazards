'use server';

import { getManoeuvrePlots } from './getManoeuvrePlots';

export async function getManoeuvrePlotShortId(shortId: string) {
  const plots = await getManoeuvrePlots();
  const plot = plots.find(plot => plot.eventShortId === shortId);
  return plot;
};
