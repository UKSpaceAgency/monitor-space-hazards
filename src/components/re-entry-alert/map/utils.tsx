import type { CircleLayerSpecification, FillLayerSpecification, SymbolLayerSpecification } from 'mapbox-gl';

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

export const FlightpathColor = '#f46a25';
export const FragmentColor = '#801650';
export const OverflightColors = [
  '#28A197',
  '#12436D',
  '#A285D1',
  '#D4351C',
  '#F499BE',
  '#B58840',
  '#5694CA',
  '#3D3D3D',
  '#85994b',
];

export type OverflightType = 'FLIGHTPATH' | 'FRAGMENT' | string;

export const flightpathStyle = (visible: boolean): CircleLayerSpecification => ({
  id: 'FLIGHTPATH',
  type: 'circle',
  source: 'FLIGHTPATH',
  paint: {
    'circle-color': FlightpathColor,
    'circle-opacity': 0.5,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#ffffff',
    'circle-radius': {
      base: 20,
      stops: [
        [0, 2],
        [3, 10],
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
    'icon-color': OverflightColors[index],
    'icon-opacity': 0.5,
  },
});

export const overflightStyle = (index: number, visible: boolean): CircleLayerSpecification => ({
  id: `OVERFLIGHT-${index}`,
  type: 'circle',
  source: `OVERFLIGHT-${index}`,
  layout: {
    visibility: visible ? 'visible' : 'none',
  },
  paint: {
    'circle-color': OverflightColors[index],
    'circle-opacity': 1,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#ffffff',
    // 'circle-stroke-opacity': 0.5,
    'circle-radius': {
      base: 20,
      stops: [
        [0, 2],
        [3, 10],
        [10, 20],
      ],
    },
  },
});
