export type ManoeuvrePlot = {
  event_short_id: string;
  originator: string;
  cdm_external_id: string;
  tca_time: string;
  primary_object_norad_id: string;
  secondary_object_norad_id: string;
  data: ManoeuvrePlotPoint[];
};

export type ManoeuvrePlotPoint = {
  burn_datetime: string;
  orbit: number;
  delta_V: number;
  ST_collision_probability: number;
  UKSA_collision_probability: number;
  total_miss_distance: number;
  radial_miss_distance: number;
};

export const getManoeuvrePlot = async (presigned_url: string): Promise<ManoeuvrePlot> => {
  const response = await fetch(presigned_url);
  const data = await response.json();

  return data;
};
