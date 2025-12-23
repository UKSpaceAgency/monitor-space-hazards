'use client';

import type { MapMouseEvent } from 'mapbox-gl';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import type { MapRef } from 'react-map-gl';
import Map, { Layer, Source } from 'react-map-gl';

import { env } from '@/libs/Env';
import Details from '@/ui/details/details';
import { RegionsEnum } from '@/utils/Regions';

import { ReentryAlertAreasOfInterest } from './ReentryAlertAreasOfInterest';
import { ReentryAlertMapCenterButton } from './ReentryAlertMapCenterButton';
import { ReentryAlertMapFullscreenButton } from './ReentryAlertMapFullscreenButton';
import type { MapTooltipInfo } from './ReentryAlertMapTooltip';
import { ReentryAlertMapType } from './ReentryAlertMapType';
import { type MapView, ReentryAlertMapView } from './ReentryAlertMapView';
import { ReentryAlertOverflights } from './ReentryAlertOverflights';
import { flightpathStyle, fragmentsCircleStyle, MapTypes, type OverflightType, regionLayer, RegionsGeoJson } from './utils';

const ReentryAlertMapTooltip = dynamic(() => import('./ReentryAlertMapTooltip').then(mod => mod.ReentryAlertMapTooltip), {
  ssr: false,
});

const initialViewState = {
  bounds: [
    [-8.649357, 49.863518], // Southwest corner of UK
    [1.76896, 60.860699], // Northeast corner of UK (including Shetland)
  ],
} as const;

const MapStyles = {
  [MapTypes.streets]: 'mapbox://styles/monitorspacehazards/cm9tmme2t01a101r3057u9pmy',
  [MapTypes.light]: 'mapbox://styles/monitorspacehazards/cmewwcttq016301sd0br6d1nf',
  [MapTypes.satellite]: 'mapbox://styles/monitorspacehazards/cmewvccvu01h901pjcz3qdy1j',
};

type ReentryAlertMapProps = {
  reentryId: string;
  reportId: string;
  overflightTime: string[];
  detailsTitle?: string;
  detailsContent?: ReactNode;
};

const ReentryAlertMap = ({ reentryId, reportId, overflightTime, detailsTitle, detailsContent }: ReentryAlertMapProps) => {
  const t = useTranslations('OverflightMap.overflights');
  const mapRef = useRef<MapRef | null>(null);
  const [mapType, setMapType] = useState<MapTypes>(MapTypes.streets);
  const [mapView, setMapView] = useState<MapView>('globe');
  const [regions, setRegions] = useState<RegionsEnum[]>([]);
  const [types, setTypes] = useState<OverflightType[]>(['FLIGHTPATH', 'FRAGMENT']);
  const [flightpaths, setFlightpaths] = useState<number[]>([0]);
  const [hoverInfo, setHoverInfo] = useState<MapTooltipInfo | null>(null);
  const [isStyleLoaded, setIsStyleLoaded] = useState<boolean>(false);

  useEffect(() => {
    setFlightpaths(flightpaths => [...new Set([...flightpaths, ...overflightTime.map((_, index) => index + 1)])]);
  }, [overflightTime]);

  const mapRefCallback = useCallback((ref: MapRef | null) => {
    if (ref !== null) {
      mapRef.current = ref;
      // Mark style as loaded when style finishes loading (fires on initial load and after style changes)
      ref.on('style.load', () => {
        setIsStyleLoaded(true);
      });
      ref.on('resize', () => {
        if (document.fullscreenElement) {
          ref.setZoom(5);
        }
      });
    }
  }, []);

  // When switching map style, temporarily hide layers/sources until the new style is ready
  useEffect(() => {
    setIsStyleLoaded(false);
  }, [mapType]);

  const handleClick = useCallback((event: MapMouseEvent) => {
    const {
      features,
    } = event;

    const hoveredFeature = features && features[0];
    // prettier-ignore
    setHoverInfo(hoveredFeature ? hoveredFeature.properties as MapTooltipInfo : null);
  }, []);

  const sourceUrl = `${window.location.origin}/reentry_event_reports/${reentryId}`;

  return (
    <div className="bg-lightGrey p-3 mb-4" data-pdf="Re-entry map">
      <div className="relative w-full aspect-[1/1] md:aspect-[4/3] bg-[#364B69] mb-4" data-type="map" aria-label="Re-entry alert map">
        <Map
          ref={mapRefCallback}
          mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          mapStyle={MapStyles[mapType]}
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
          <ReentryAlertMapFullscreenButton mapRef={mapRef} />
          {isStyleLoaded && (
            <>
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
                            slot="middle"
                            layout={{
                              visibility: 'visible',
                            }}
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
                      <Layer {...regionLayer(region)} slot="bottom" />
                    </Source>
                  ))}
              {flightpaths && flightpaths.map(index => (
                <Source
                  key={`FLIGHTPATH-${index}`}
                  type="geojson"
                  data={`${sourceUrl}/${reportId}-overflight_features_${index}.geojson`}
                >
                  <Layer
                    {...flightpathStyle(index, types.includes('FLIGHTPATH') && flightpaths.includes(index))}
                    slot="middle"
                  />
                </Source>
              ))}
              {flightpaths.map(index => (
                <Source key={`FRAGMENT-${index}`} type="geojson" data={`${sourceUrl}/${reportId}-fragment_features_${index}.geojson`}>
                  <Layer
                    {...fragmentsCircleStyle(index, types.includes('FRAGMENT') && flightpaths.includes(index))}
                    slot="middle"
                  />
                </Source>
              ))}
            </>
          )}
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
          {/* <ReentryAlertMapLegend /> */}
        </Map>
      </div>
      <div className="flex gap-2 items-center mb-6">
        <h4 className="govuk-body-s mb-0">Download re-entry geoJSON data:</h4>
        <ul className="flex gap-2 flex-wrap">
          <li>
            <a
              href={`${sourceUrl}/${reportId}-overflight_features_0.geojson`}
              download={`${reentryId}-${reportId}-flightpath.geojson`}
              className="govuk-link text-blue"
              rel="noopener noreferrer"
              target="_blank"
              aria-label={`Download ${t('flightpath')} data - GeoJson format - (open in new tab)`}
            >
              {t('flightpath')}
            </a>
          </li>
          {overflightTime.map((_, index) => {
            const number = index + 1;
            return (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={`DOWNLOADS-${index}`}>
                <li>
                  <a
                    href={`${sourceUrl}/${reportId}-overflight_features_${number}.geojson`}
                    download={`${reentryId}-${reportId}-overflight_${number}.geojson`}
                    className="govuk-link text-blue"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {t('overflight', { number })}
                  </a>
                </li>
                <li>
                  <a
                    href={`${sourceUrl}/${reportId}-fragment_features_${number}.geojson`}
                    download={`${reentryId}-${reportId}-fragment_${number}.geojson`}
                    className="govuk-link text-blue"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {t('fragment', { number })}
                  </a>
                </li>
              </Fragment>

            );
          })}
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <ReentryAlertMapType value={mapType} onChange={setMapType} />
        <ReentryAlertMapView value={mapView} onChange={setMapView} />
      </div>
      <ReentryAlertAreasOfInterest selected={regions} onChange={setRegions} />
      <ReentryAlertOverflights types={types} setTypes={setTypes} overflights={overflightTime} selected={flightpaths} onChange={setFlightpaths} />

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
