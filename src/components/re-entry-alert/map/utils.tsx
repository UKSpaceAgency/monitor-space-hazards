import type { CircleLayerSpecification, FillLayerSpecification, HeatmapLayerSpecification, SymbolLayerSpecification } from 'mapbox-gl';

import { RegionsEnum } from '@/utils/Regions';

import EnglandGeojson from './regions/england.json';
import IrelandGeojson from './regions/ireland.json';
import LondonFirGeojson from './regions/london_fir.json';
import NavareaGeojson from './regions/navarea.json';
import OverseasGeojson from './regions/overseas.json';
import ScotlandGeojson from './regions/scotland.json';
import ScottishFirGeojson from './regions/scotland_fir.json';
import ShanwickGeojson from './regions/shanwick.json';
import WalesGeojson from './regions/wales.json';

export enum MapTypes {
  streets = 'streets',
  light = 'light',
  satellite = 'satellite',
}

export const RegionsGeoJson: Partial<Record<RegionsEnum, unknown>> = {
  [RegionsEnum.ENGLAND]: EnglandGeojson,
  [RegionsEnum.NORTHERN_IRELAND]: IrelandGeojson,
  [RegionsEnum.SCOTLAND]: ScotlandGeojson,
  [RegionsEnum.WALES]: WalesGeojson,
  [RegionsEnum.BRITISH_OVERSEAS_TERRITORIES]: OverseasGeojson,
  [RegionsEnum.SHANWICK]: ShanwickGeojson,
  [RegionsEnum.NAVAREA]: NavareaGeojson,
  [RegionsEnum.LONDON_FIR]: LondonFirGeojson,
  [RegionsEnum.SCOTLAND_FIR]: ScottishFirGeojson,
  [RegionsEnum.UK_AIRSPACE]: [
    ShanwickGeojson,
    LondonFirGeojson,
    ScottishFirGeojson,
  ],
};

export const RegionColor = '#FFDD00';

export const regionLayer = (region: string): FillLayerSpecification => ({
  id: region,
  source: region,
  type: 'fill',
  paint: {
    'fill-color': RegionColor,
    'fill-outline-color': RegionColor,
    'fill-opacity': 0.6,
  },
});

// here is flightpath color
export const FlightpathColor = '#3D3D3D';
export const FragmentColor = '#801650';
export const OverflightColor = '#F46A25';
// export const OverflightColors = [
//   FlightpathColor,
//   '#28A197',
//   '#12436D',
//   '#A285D1',
//   '#D4351C',
//   '#F499BE',
//   '#B58840',
//   '#5694CA',
//   '#3D3D3D',
//   '#85994b',
// ];

export type OverflightType = 'FLIGHTPATH' | 'FRAGMENT' | string;

export const flightpathStyle = (index: number, visible: boolean): CircleLayerSpecification => ({
  id: `FLIGHTPATH-${index}`,
  type: 'circle',
  source: `FLIGHTPATH-${index}`,
  paint: {
    'circle-color': index === 0 ? FlightpathColor : OverflightColor,
    'circle-opacity': 0.6,
    'circle-blur': 0.85,
    'circle-radius': {
      stops: [
        [0, 2],
        [5, 10],
        [10, 180],
      ],
    },
  },
  layout: {
    visibility: visible ? 'visible' : 'none',
  },
});

export const fragmentsStyle = (index: number, visible: boolean): SymbolLayerSpecification => ({
  id: `FRAGMENT-${index}`,
  type: 'symbol',
  source: `FRAGMENT-${index}`,
  layout: {
    'icon-image': 'fragments-icon',
    'icon-size': {
      base: 0.25,
      stops: [
        [0, 0.1],
        [3, 0.25],
      ],
    },
    'icon-allow-overlap': true,
    'visibility': visible ? 'visible' : 'none',
  },
  paint: {
    'icon-color': index === 0 ? FlightpathColor : OverflightColor,
    'icon-opacity': 0.6,
  },
});

export const fragmentsCircleStyle = (index: number, visible: boolean): CircleLayerSpecification => ({
  id: `FRAGMENT-${index}`,
  type: 'circle',
  source: `FRAGMENT-${index}`,
  paint: {
    // Color changes based on the number of circles (fragments_number)
    'circle-color': FragmentColor,
    'circle-opacity': [
      'interpolate',
      ['linear'],
      ['get', 'fragments_number'],
      0,
      0.1,
      1000,
      1,
    ],
    'circle-blur': 0.5,
    'circle-radius': {
      stops: [
        [0, 2],
        [5, 10],
        [10, 180],
      ],
    },
  },
  layout: {
    visibility: visible ? 'visible' : 'none',
  },
});

export const fragmentsHeatmapStyle = (index: number, visible: boolean): HeatmapLayerSpecification => ({
  id: `FRAGMENT-HEATMAP-${index}`,
  type: 'heatmap',
  source: `FRAGMENT-${index}`,
  layout: {
    visibility: visible ? 'visible' : 'none',
  },
  paint: {
    // Use fragments_number as the weight for the heatmap
    'heatmap-weight': [
      'interpolate',
      ['linear'],
      ['get', 'fragments_number'],
      0,
      0,
      10,
      1,
    ],
    // Use OverflightColors[index] as the base color for the heatmap
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(0,0,0,0)',
      0.2,
      FragmentColor,
      1,
      FragmentColor,
    ],
    'heatmap-intensity': 1,
    'heatmap-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      0,
      10,
      9,
      30,
    ],
    'heatmap-opacity': 0.7,
  },
});
