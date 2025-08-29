'use client';

import type { FeatureCollection, Point } from 'geojson';
import type { MapMouseEvent } from 'mapbox-gl';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { MapRef } from 'react-map-gl';
import Map, { FullscreenControl, Layer, Source } from 'react-map-gl';

import { env } from '@/libs/Env';
import Details from '@/ui/details/details';
import { RegionsEnum } from '@/utils/Regions';

import { ReentryAlertAreasOfInterest } from './ReentryAlertAreasOfInterest';
import { ReentryAlertMapCenterButton } from './ReentryAlertMapCenterButton';
import { ReentryAlertMapLegend } from './ReentryAlertMapLegend';
import type { MapTooltipInfo } from './ReentryAlertMapTooltip';
import { type MapType, ReentryAlertMapType } from './ReentryAlertMapType';
import { type MapView, ReentryAlertMapView } from './ReentryAlertMapView';
import { ReentryAlertOverflights } from './ReentryAlertOverflights';
import { flightpathStyle, fragmentsCircleStyle, type OverflightType, regionLayer, RegionsGeoJson } from './utils';

const ReentryAlertMapTooltip = dynamic(() => import('./ReentryAlertMapTooltip').then(mod => mod.ReentryAlertMapTooltip), {
  ssr: false,
});

const initialViewState = {
  bounds: [
    [-8.649357, 49.863518], // Southwest corner of UK
    [1.76896, 60.860699], // Northeast corner of UK (including Shetland)
  ],
} as const;

type ReentryAlertMapProps = {
  overflightTime: string[];
  flightpathsCollection: Map<number, FeatureCollection<Point>>;
  fragmentsCollection: Map<number, FeatureCollection<Point>>;
  detailsTitle?: string;
  detailsContent?: ReactNode;
};

const ReentryAlertMap = ({ overflightTime, flightpathsCollection, fragmentsCollection, detailsTitle, detailsContent }: ReentryAlertMapProps) => {
  const mapRef = useRef<MapRef | null>(null);
  const [mapType, setMapType] = useState<MapType>('streets-v12');
  const [mapView, setMapView] = useState<MapView>('globe');
  const [regions, setRegions] = useState<RegionsEnum[]>([]);
  const [types, setTypes] = useState<OverflightType[]>(['FLIGHTPATH', 'FRAGMENT']);
  const [flightpaths, setFlightpaths] = useState<number[]>([0]);
  const [hoverInfo, setHoverInfo] = useState<MapTooltipInfo | null>(null);

  useEffect(() => {
    setFlightpaths(flightpaths => [...new Set([...flightpaths, ...overflightTime.map((_, index) => index + 1)])]);
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
      ref.on('resize', () => {
        if (document.fullscreenElement) {
          ref.setZoom(5);
        }
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
      <ReentryAlertOverflights types={types} setTypes={setTypes} overflights={overflightTime} selected={flightpaths} onChange={setFlightpaths} />
      <div className="relative w-full aspect-[1/1] md:aspect-[4/3] bg-[#364B69] mb-4" data-type="map" aria-label="Re-entry alert map">
        <Map
          ref={mapRefCallback}
          mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          mapStyle={`mapbox://styles/mapbox/${mapType}`}
          projection={{
            name: mapView,
          }}
          preserveDrawingBuffer
          initialViewState={initialViewState as any}
          interactiveLayerIds={['land', ...flightpaths.reduce<string[]>((acc, curr) => {
            return [...acc, `FLIGHTPATH-${curr}`, `FRAGMENT-${curr}`];
          }, [])]}
          fog={{
            'color': '#ffffff',
            'horizon-blend': 0.05,
            'high-color': 'rgba(0, 0, 0, 0)',
            'space-color': 'rgb(54, 75, 105)',
            'star-intensity': 0.5,
          }}
          onClick={handleClick}
          attributionControl={false}
          renderWorldCopies={false}
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
          {flightpathsCollection && Array.from(flightpathsCollection.entries()).map(([index, flightpath]) => (
            <Source key={`FLIGHTPATH-${index}`} type="geojson" data={flightpath}>
              <Layer
                {...flightpathStyle(index, types.includes('FLIGHTPATH') && flightpaths.includes(index))}
                beforeId="airport-label"
              />
            </Source>
          ))}
          {fragmentsCollection && Array.from(fragmentsCollection.entries()).map(([index, fragments]) => (
            <Source key={`FRAGMENT-${index}`} type="geojson" data={fragments}>
              <Layer
                {...fragmentsCircleStyle(index, types.includes('FRAGMENT') && flightpaths.includes(index))}
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
      <Details
        summary={detailsTitle}
        className="mb-0"
      >
        {detailsContent}
      </Details>
    </div>
  );
};

export { ReentryAlertMap };
