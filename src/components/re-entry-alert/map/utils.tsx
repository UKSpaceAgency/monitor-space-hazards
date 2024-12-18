import type { CircleLayerSpecification, FillLayerSpecification } from 'mapbox-gl';

import { RegionsEnum } from '@/utils/Regions';

import EnglandGeojson from './regions/england.json';
import IrelandGeojson from './regions/ireland.json';
import NavareaGeojson from './regions/navarea.json';
import OverseasGeojson from './regions/overseas.json';
import ScotlandGeojson from './regions/scotland.json';
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
};

export const RegionColor = '#FFDD00';

export const regionLayer = (region: RegionsEnum): FillLayerSpecification => ({
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

export type OverflightType = 'FLIGHTPATH' | 'FRAGMENTS' | string;

export const flightpathStyle: CircleLayerSpecification = {
  id: 'FLIGHTPATH',
  type: 'circle',
  source: 'FLIGHTPATH',
  paint: {
    'circle-color': FlightpathColor,
    'circle-opacity': 0.5,
    'circle-radius': {
      base: 20,
      stops: [
        [0, 2],
        [3, 10],
      ],
    },
  },
};

export const fragmentsStyle: CircleLayerSpecification = {
  id: 'FRAGMENTS',
  type: 'circle',
  source: 'FRAGMENTS',
  paint: {
    'circle-color': FragmentColor,
    'circle-opacity': 0.5,
    'circle-radius': {
      base: 10,
      stops: [
        [0, 1],
        [3, 5],
      ],
    },
  },
};

export const overflightStyle = (index: number): CircleLayerSpecification => ({
  id: `OVERFLIGHT-${index}`,
  type: 'circle',
  source: `OVERFLIGHT-${index}`,
  paint: {
    'circle-color': OverflightColors[index],
    'circle-opacity': 0.5,
    'circle-radius': {
      base: 20,
      stops: [
        [0, 2],
        [3, 10],
      ],
    },
  },
});
