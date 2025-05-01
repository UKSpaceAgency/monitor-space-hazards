'use server';

import type { Feature, FeatureCollection, Point } from 'geojson';

import { jsonRegionsMap } from '@/utils/Regions';

type MapPoint = {
  overflight?: string;
  latitude: number;
  longitude: number;
  region: string | null;
  pass: number | null;
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

const generateFeature = (point: MapPoint, type: 'overflight' | 'fragments' | 'flightpath'): Feature<Point> => ({
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
        }).join(', ')
      : null,
    type,
    ...point,
  },
});

export async function getReentryAlertMapData(presignedUrl: string) {
  const data = await fetch(presignedUrl);
  const reports: ReportRespsponseData[] = await data.json();
  const lastReport = reports[0];

  if (!lastReport) {
    throw new Error('No reports found');
  }

  const flightpathsCollection = new Map<number, FeatureCollection<Point>>([
    [0, {
      type: 'FeatureCollection',
      features: [],
    }],
  ]);
  const fragmentsCollection = new Map<number, FeatureCollection<Point>>([
    [0, {
      type: 'FeatureCollection',
      features: [],
    }],
  ]);

  lastReport.overflight_time.forEach((_, index) => {
    const number = index + 1;
    flightpathsCollection.set(number, {
      type: 'FeatureCollection',
      features: [],
    });
    fragmentsCollection.set(number, {
      type: 'FeatureCollection',
      features: [],
    });
  });

  for (const point of lastReport.map_points) {
    if (point.pass) {
      flightpathsCollection.get(point.pass)?.features.push(generateFeature(point, 'overflight'));
    } else {
      flightpathsCollection.get(0)?.features.push(generateFeature(point, 'flightpath'));
    }
    if (point.fragments.length > 0) {
      for (const fragment of point.fragments) {
        const fragmentPoint = {
          ...fragment,
          pass: point.pass,
        };
        if (point.pass) {
          fragmentsCollection.get(point.pass)?.features.push(generateFeature(fragmentPoint, 'fragments'));
        } else {
          fragmentsCollection.get(0)?.features.push(generateFeature(fragmentPoint, 'fragments'));
        }
      }
    }
  }

  return {
    overflightTime: lastReport.overflight_time,
    flightpathsCollection,
    fragmentsCollection,
    // overflightCollection,
  };
};
