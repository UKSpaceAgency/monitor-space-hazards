import type { CircleLayerSpecification, FillLayerSpecification } from 'mapbox-gl';

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

export const RegionColor = '#FF0066';

export const regionLayer = (region: string): FillLayerSpecification => ({
  id: region,
  source: region,
  type: 'fill',
  paint: {
    'fill-color': RegionColor,
    'fill-outline-color': RegionColor,
    'fill-opacity': 0.2,
  },
});

// here is flightpath color
export const FlightpathColor = '#007CC8';
export const FragmentColor = '#C00000';
export const OverflightColor = '#FFC000';

export type OverflightType = 'FLIGHTPATH' | 'FRAGMENT' | string;

export const flightpathStyle = (index: number, visible: boolean): CircleLayerSpecification => ({
  id: `FLIGHTPATH-${index}`,
  type: 'circle',
  source: `FLIGHTPATH-${index}`,
  paint: {
    'circle-color': index === 0 ? FlightpathColor : OverflightColor,
    'circle-opacity': {
      stops: [
        [0, 0.5],
        [2, 0.5],
        [3, 0.5],
        [4, 0.6],
        [5, 0.6],
        [7, 0.8],
        [8, 0.8],
        [10, 0.8],
      ],
    },
    'circle-blur': {
      stops: [
        [0, 1],
        [5, 1],
        [10, 1],
      ],
    },
    'circle-radius': {
      stops: [
        [0, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
      ],
    },
  },
  layout: {
    visibility: visible ? 'visible' : 'none',
  },
});

export const fragmentsCircleStyle = (index: number, visible: boolean): CircleLayerSpecification => ({
  id: `FRAGMENT-${index}`,
  type: 'circle',
  source: `FRAGMENT-${index}`,
  paint: {
    // Color changes based on the number of circles (fragments_number)
    'circle-color': FragmentColor,
    'circle-opacity': {
      stops: [
        [0, 0.2],
        [2, 0.2],
        [3, 0.2],
        [4, 0.2],
        [5, 0.3],
        [7, 0.3],
        [8, 0.3],
        [10, 0.3],
      ],
    },
    'circle-blur': {
      stops: [
        [0, 2],
        [5, 2.5],
        [10, 3],
      ],
    },
    'circle-radius': {
      stops: [
        [0, 1],
        [2, 2],
        [3, 4],
        [4, 8],
        [5, 16],
      ],
    },
  },
  layout: {
    visibility: visible ? 'visible' : 'none',
  },
});

// const heatmapOptions: HeatmapLayerSpecification['paint'] = {
//   'heatmap-intensity': [
//     'interpolate',
//     ['linear'],
//     ['zoom'],
//     0,
//     0,
//     9,
//     1.2,
//   ],
//   'heatmap-radius': [
//     'interpolate',
//     ['linear'],
//     ['zoom'],
//     0,
//     1,
//     5,
//     8,
//     9,
//     8,
//   ],
//   'heatmap-weight': [
//     'interpolate',
//     ['linear'],
//     ['get', 'fragments_number'],
//     0,
//     0,
//     1,
//     1,
//   ],
// };

// export const fragmentsHeatmapStyle = (index: number, visible: boolean): HeatmapLayerSpecification => ({
//   id: `FRAGMENT-${index}`,
//   type: 'heatmap',
//   source: `FRAGMENT-${index}`,
//   layout: {
//     visibility: visible ? 'visible' : 'none',
//   },
//   paint: {
//     'heatmap-intensity': [
//       'interpolate',
//       ['linear'],
//       ['zoom'],
//       0,
//       0,
//       9,
//       1.2,
//     ],
//     'heatmap-radius': [
//       'interpolate',
//       ['linear'],
//       ['zoom'],
//       0,
//       1,
//       5,
//       8,
//       9,
//       8,
//     ],
//     'heatmap-weight': [
//       'interpolate',
//       ['linear'],
//       ['get', 'fragments_number'],
//       0,
//       0,
//       1,
//       1,
//     ],
//     'heatmap-color': [
//       'interpolate',
//       ['linear'],
//       ['heatmap-density'],
//       0,
//       'rgba(192,0,0, 0)', // FragmentColor with 0 opacity
//       0.1,
//       'rgba(192,0,0, 0.1)', // FragmentColor with low opacity
//       0.3,
//       'rgba(192,0,0, 0.2)', // FragmentColor with medium opacity
//       0.6,
//       'rgba(192,0,0, 0.4)', // FragmentColor with higher opacity
//       1,
//       'rgba(192,0,0, 0.6)', // FragmentColor with high opacity
//     ],
//   },
// });

// export const flightpathHeatmapStyle = (index: number, visible: boolean): HeatmapLayerSpecification => ({
//   id: `FLIGHTPATH-${index}`,
//   type: 'heatmap',
//   source: `FLIGHTPATH-${index}`,
//   layout: {
//     visibility: visible ? 'visible' : 'none',
//   },
//   paint: {
//     'heatmap-intensity': [
//       'interpolate',
//       ['linear'],
//       ['zoom'],
//       0,
//       0.5,
//       9,
//       1.2,
//     ],
//     'heatmap-radius': [
//       'interpolate',
//       ['linear'],
//       ['zoom'],
//       0,
//       1,
//       5,
//       8,
//       9,
//       8,
//     ],
//     'heatmap-color': [
//       'interpolate',
//       ['linear'],
//       ['heatmap-density'],
//       0,
//       index === 0 ? 'rgba(0,124,200, 0)' : 'rgba(146,208,80, 0)', // FlightpathColor or OverflightColor with 0 opacity
//       0.1,
//       index === 0 ? 'rgba(0,124,200, 0.1)' : 'rgba(146,208,80, 0.1)', // FlightpathColor or OverflightColor with low opacity
//       0.3,
//       index === 0 ? 'rgba(0,124,200, 0.2)' : 'rgba(146,208,80, 0.2)', // FlightpathColor or OverflightColor with medium opacity
//       0.6,
//       index === 0 ? 'rgba(0,124,200, 0.4)' : 'rgba(146,208,80, 0.4)', // FlightpathColor or OverflightColor with higher opacity
//       1,
//       index === 0 ? 'rgba(0,124,200, 0.6)' : 'rgba(146,208,80, 0.6)', // FlightpathColor or OverflightColor with high opacity
//     ],
//   },
// });
