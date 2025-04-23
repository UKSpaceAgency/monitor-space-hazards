'use client';

import type { FeatureCollection, Point } from 'geojson';
import type { MapMouseEvent } from 'mapbox-gl';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MapRef } from 'react-map-gl';
import Map, { FullscreenControl, Layer, Source } from 'react-map-gl';

import { env } from '@/libs/Env';
import { RegionsEnum } from '@/utils/Regions';

import { ReentryAlertAreasOfInterest } from './ReentryAlertAreasOfInterest';
import { ReentryAlertMapCenterButton } from './ReentryAlertMapCenterButton';
import { ReentryAlertMapLegend } from './ReentryAlertMapLegend';
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
  fragmentsCollection: FeatureCollection<Point>[];
  overflightCollection?: FeatureCollection<Point>[];
};

const ReentryAlertMap = ({ overflightTime, flightpathCollection, fragmentsCollection, overflightCollection }: ReentryAlertMapProps) => {
  const mapRef = useRef<MapRef | null>(null);
  const [mapType, setMapType] = useState<MapType>('light-v11');
  const [mapView, setMapView] = useState<MapView>('globe');
  const [regions, setRegions] = useState<RegionsEnum[]>([]);
  const [types, setTypes] = useState<OverflightType[]>(['FLIGHTPATH', 'FRAGMENT']);
  const [overflights, setOverflights] = useState<OverflightType[]>(['FLIGHTPATH']);
  const [hoverInfo, setHoverInfo] = useState<MapTooltipInfo | null>(null);

  useEffect(() => {
    setOverflights(overflights => [...new Set([...overflights, ...overflightTime.map((_, index) => `OVERFLIGHT-${index}`)])]);
  }, [overflightTime]);

  const loadImage = useCallback((map: MapRef) => {
    if (!map.hasImage('fragments-icon')) {
      map.loadImage('/fragments.png', (error, image) => {
        if (error || !image) {
          throw error;
        }
        map.addImage('fragments-icon', image, { sdf: true });
      });
    }
  }, []);

  const mapRefCallback = useCallback((ref: MapRef | null) => {
    if (ref !== null) {
      mapRef.current = ref;
      // Add event listener for style.load
      ref.on('style.load', () => {
        loadImage(ref);
      });
    }
  }, [loadImage]);

  const handleClick = useCallback((event: MapMouseEvent) => {
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
      <ReentryAlertOverflights types={types} setTypes={setTypes} overflights={overflightTime} selected={overflights} onChange={setOverflights} />
      <div className="relative w-full h-[500px]" data-type="map">
        <Map
          ref={mapRefCallback}
          mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          mapStyle={`mapbox://styles/mapbox/${mapType}`}
          projection={{
            name: mapView,
          }}
          preserveDrawingBuffer
          initialViewState={initialViewState}
          interactiveLayerIds={['land', ...overflights.reduce((acc, curr) => {
            if (curr.includes('OVERFLIGHT')) {
              return [...acc, curr, curr.replace('OVERFLIGHT', 'FRAGMENT')];
            }
            return acc;
          }, [] as string[])]}
          fog={{
            'color': '#ffffff',
            'horizon-blend': 0.05,
            'high-color': 'rgba(0, 0, 0, 0)',
            'space-color': 'rgb(54, 75, 105)',
            'star-intensity': 0.5,
          }}
          onClick={handleClick}
          attributionControl={false}
        >
          <FullscreenControl />
          {regions.map(region => region === RegionsEnum.UK_AIRSPACE
            ? (
                (RegionsGeoJson[RegionsEnum.UK_AIRSPACE] as unknown[]).map((airspace: unknown, index: number) => {
                  return (
                    <Source
                      // eslint-disable-next-line react/no-array-index-key
                      key={`UK_AIRSPACE-${index}`}
                      id={`UK_AIRSPACE-${index}`}
                      type="geojson"
                      data={airspace}
                    >
                      <Layer
                        {...regionLayer(`UK_AIRSPACE-${index}`)}
                        layout={{
                          visibility: 'visible',
                        }}
                        beforeId="airport-label"
                      />
                    </Source>
                  );
                })
              )
            : (
                <Source
                  key={region}
                  id={region}
                  type="geojson"
                  data={RegionsGeoJson[region]}
                >
                  <Layer {...regionLayer(region)} />
                </Source>
              ))}
          {flightpathCollection && (
            <Source key="FLIGHTPATH" type="geojson" data={flightpathCollection}>
              <Layer
                {...flightpathStyle(types.includes('FLIGHTPATH') && overflights.includes('FLIGHTPATH'))}
                beforeId="airport-label"
              />
            </Source>
          )}
          {fragmentsCollection && fragmentsCollection.map((fragments, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Source key={`FRAGMENT-${index}`} type="geojson" data={fragments}>
              <Layer
                {...fragmentsStyle(index, types.includes('FRAGMENT') && overflights.includes(`OVERFLIGHT-${index}`))}
                beforeId="airport-label"
              />
            </Source>
          ))}
          {overflightCollection && overflightCollection.map((overflight, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Source key={`OVERFLIGHT-${index}`} type="geojson" data={overflight}>
              <Layer
                {...overflightStyle(index, types.includes('FLIGHTPATH') && overflights.includes(`OVERFLIGHT-${index}`))}
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
              pass={hoverInfo.pass}
              type={hoverInfo.type}
              onClose={() => setHoverInfo(null)}
            />
          )}
          <ReentryAlertMapCenterButton />
          <ReentryAlertMapLegend />
        </Map>
      </div>
    </div>
  );
};

export { ReentryAlertMap };
