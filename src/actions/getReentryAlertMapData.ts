'use server';

import type { Feature, FeatureCollection, Point } from 'geojson';

import { jsonRegionsMap } from '@/utils/Regions';

type MapPoint = {
  overflight?: string;
  latitude: number;
  longitude: number;
  region: string | null;
};

type ReportRespsponseData = {
  overflight_time: string[];
  map_points: {
    overflight: string;
    latitude: number;
    longitude: number;
    pass: number | null;
    region: string | null;
    fragments: {
      latitude: number;
      longitude: number;
      numFrags: number;
      region: string | null;
    }[];
  }[];
};

const generateFeature = (point: MapPoint): Feature<Point> => ({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [point.longitude, point.latitude],
  },
  properties: {
    regions: Array.isArray(point.region) && point.region.length > 0
      ? point.region.map((el) => {
        const [_, last] = el.split('.');
        return jsonRegionsMap[last];
      }).join('\n')
      : null,
    overflight: point.overflight,
    longitude: point.longitude,
    latitude: point.latitude,
  },
});

export async function getReentryAlertMapData(presignedUrl: string) {
  const data = await fetch(presignedUrl);
  const reports: ReportRespsponseData[] = await data.json();
  const lastReport = reports[0];

  const flightpathCollection: FeatureCollection<Point> = {
    type: 'FeatureCollection',
    features: [],
  };

  const fragmentsCollection: FeatureCollection<Point> = {
    type: 'FeatureCollection',
    features: [],
  };

  const overflightCollection: FeatureCollection<Point>[] = lastReport?.overflight_time.map((_, index) => ({
    type: 'FeatureCollection',
    id: `overflight-${index}`,
    features: [],
  })) || [];

  if (!lastReport) {
    throw new Error('No reports found');
  }

  for (const point of lastReport.map_points) {
    if (!point.pass) {
      flightpathCollection.features.push(generateFeature(point));
    }
    if (point.pass !== null) {
      overflightCollection[point.pass - 1]?.features.push(generateFeature(point));
    }
    if (point.fragments) {
      for (const fragment of point.fragments) {
        fragmentsCollection.features.push(generateFeature(fragment));
      }
    }
  }
  return {
    overflightTime: lastReport.overflight_time,
    flightpathCollection,
    fragmentsCollection,
    overflightCollection,
  };
};
