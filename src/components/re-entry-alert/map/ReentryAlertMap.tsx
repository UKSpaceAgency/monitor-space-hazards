'use client';

import 'mapbox-gl/dist/mapbox-gl.css';

import type { FeatureCollection, Point } from 'geojson';
import type { MapMouseEvent } from 'mapbox-gl';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import Map, { Layer, Source } from 'react-map-gl';

import { env } from '@/libs/Env';
import type { RegionsEnum } from '@/utils/Regions';

import { ReentryAlertAreasOfInterest } from './ReentryAlertAreasOfInterest';
import { ReentryAlertMapCenterButton } from './ReentryAlertMapCenterButton';
import type { MapTooltipInfo } from './ReentryAlertMapTooltip';
import type { MapType } from './ReentryAlertMapType';
import { ReentryAlertMapType } from './ReentryAlertMapType';
import type { MapView } from './ReentryAlertMapView';
import { ReentryAlertMapView } from './ReentryAlertMapView';
import { ReentryAlertOverflights } from './ReentryAlertOverflights';
import type { OverflightType } from './utils';
import { flightpathStyle, fragmentsStyle, overflightStyle, regionLayer, RegionsGeoJson } from './utils';

const ReentryAlertMapTooltip = dynamic(() => import('./ReentryAlertMapTooltip').then(mod => mod.ReentryAlertMapTooltip), {
  ssr: false,
});

const initialViewState = {
  longitude: -4.801161,
  latitude: 53.22865,
  zoom: 1,
} as const;

type ReentryAlertMapProps = {
  overflightTime: string[];
  flightpathCollection: FeatureCollection<Point>;
  fragmentsCollection: FeatureCollection<Point>;
  overflightCollection?: FeatureCollection<Point>[];
};

const ReentryAlertMap = ({ overflightTime, flightpathCollection, fragmentsCollection, overflightCollection }: ReentryAlertMapProps) => {
  const [mapType, setMapType] = useState<MapType>('streets-v12');
  const [mapView, setMapView] = useState<MapView>('globe');
  const [regions, setRegions] = useState<RegionsEnum[]>([]);
  const [overflights, setOverflights] = useState<OverflightType[]>(['FLIGHTPATH', 'FRAGMENTS']);
  const [hoverInfo, setHoverInfo] = useState<MapTooltipInfo | null>(null);

  useEffect(() => {
    setOverflights(overflights => [...new Set([...overflights, ...overflightTime.map((_, index) => `OVERFLIGHT-${index}`)])]);
  }, [overflightTime]);

  const onHover = useCallback((event: MapMouseEvent) => {
    const {
      features,
    } = event;

    const hoveredFeature = features && features[0];

    // prettier-ignore
    setHoverInfo(hoveredFeature ? hoveredFeature.properties as MapTooltipInfo : null);
  }, []);

  return (
    <div className="bg-lightGrey p-3 mb-4" data-pdf="Re-entry map">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <ReentryAlertMapType value={mapType} onChange={setMapType} />
        <ReentryAlertMapView value={mapView} onChange={setMapView} />
      </div>
      <ReentryAlertAreasOfInterest selected={regions} onChange={setRegions} />
      <ReentryAlertOverflights overflights={overflightTime} selected={overflights} onChange={setOverflights} />
      <div className="relative w-full h-[500px]" data-type="map">
        <Map
          mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          mapStyle={`mapbox://styles/mapbox/${mapType}`}
          projection={{
            name: mapView,
          }}
          preserveDrawingBuffer
          initialViewState={initialViewState}
          interactiveLayerIds={['land', ...overflights]}
          onMouseMove={onHover}
          attributionControl={false}
        >
          {regions.map(region => (
            <Source
              key={region}
              id={region}
              type="geojson"
              data={RegionsGeoJson[region]}
            >
              <Layer
                {...regionLayer(region)}
                layout={{
                  visibility: regions.includes(region)
                    ? 'visible'
                    : 'none',
                }}
                beforeId="airport-label"
              />
            </Source>
          ))}
          {flightpathCollection && (
            <Source key="FLIGHTPATH" type="geojson" data={flightpathCollection}>
              <Layer
                {...flightpathStyle}
                layout={{
                  visibility: overflights.includes('FLIGHTPATH')
                    ? 'visible'
                    : 'none',
                }}
                beforeId="airport-label"
              />
            </Source>
          )}
          {fragmentsCollection && (
            <Source key="FRAGMENTS" type="geojson" data={fragmentsCollection}>
              <Layer
                {...fragmentsStyle}
                layout={{
                  visibility: overflights.includes('FRAGMENTS')
                    ? 'visible'
                    : 'none',
                }}
                beforeId="airport-label"
              />
            </Source>
          )}
          {overflightCollection && overflightCollection.map((overflight, index) => (
          // eslint-disable-next-line react/no-array-index-key
            <Source key={`OVERFLIGHT-${index}`} type="geojson" data={overflight}>
              <Layer
                {...overflightStyle(index)}
                layout={{
                  visibility: overflights.includes(`OVERFLIGHT-${index}`)
                    ? 'visible'
                    : 'none',
                }}
                beforeId="airport-label"
              />
            </Source>
          ))}
          {hoverInfo && (
            <ReentryAlertMapTooltip
              regions={hoverInfo?.regions}
              overflight={hoverInfo.overflight}
              latitude={hoverInfo.latitude}
              longitude={hoverInfo.longitude}
            />
          )}
          <ReentryAlertMapCenterButton />
        </Map>
      </div>
    </div>
  );
};

export { ReentryAlertMap };
