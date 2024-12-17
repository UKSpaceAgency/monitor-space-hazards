export const getFullCountry = (key: string | null | undefined) => {
  if (!key) {
    return '-';
  }

  const list = {
    UK: 'United Kingdom',
    US: 'United States',
    JPN: 'Japan',
    PRC: 'People\'s Republic of China',
    CIS: 'Commonwealth of Independent States',
    ALG: 'Algeria',
    ARGN: 'Argentina',
    AC: 'Asia Satellite Telecommunications Company',
    AUS: 'Australia',
    AZER: 'Azerbaijan',
    BGD: 'Bangladesh',
    BELA: 'Belarus',
    BOL: 'Bolivia',
    BRAZ: 'Brazil',
    BGR: 'Bulgaria',
    CA: 'Canada',
    CHLE: 'Chile',
    CHBZ: 'China/Brazil',
    CZCH: 'Czech Republic (Former Czechoslovakia)',
    CZ: 'Czechia',
    DEN: 'Denmark',
    ECU: 'Ecuador',
    EGYP: 'Egypt',
    EST: 'Estonia',
    EUME: 'European Organisation for the Exploitation of Meteorological Satellites',
    ESA: 'European Space Agency',
    EUTE: 'European Telecommunications Satellite Organization',
    FR: 'France',
    FGER: 'France/Germany',
    FRIT: 'France/Italy',
    GER: 'Germany',
    GLOB: 'Globalstar',
    GREC: 'Greece',
    HUN: 'Hungary',
    IND: 'India',
    INDO: 'Indonesia',
    IM: 'International Mobile Satellite Organization',
    ISS: 'International Space Station',
    ITSO: 'International Telecommunications Satellite Organization',
    IRAN: 'Iran',
    IRAK: 'Iraq',
    ISRA: 'Israel',
    IT: 'Italy',
    KAZ: 'Kazakhstan',
    KEN: 'Kenya',
    KWT: 'Kuwait',
    LAOS: 'Laos',
    LTU: 'Lithuania',
    LUXE: 'Luxembourg',
    MALA: 'Malaysia',
    MEX: 'Mexico',
    MA: 'Morocco',
    NETH: 'Netherlands',
    NICO: 'New ICO',
    NZ: 'New Zealand',
    NIG: 'Nigeria',
    NATO: 'North Atlantic Treaty Organization',
    NKOR: 'North Korea',
    NOR: 'Norway',
    O3B: 'O3B Networks',
    ORB: 'ORBCOMM',
    PAKI: 'Pakistan',
    PER: 'Peru',
    RP: 'Philippines',
    POL: 'Poland',
    POR: 'Portugal',
    QAT: 'Qatar',
    RASC: 'Regional African Satellite Communications Organization',
    RWA: 'Republic of Rwanda',
    SVN: 'Republic of Slovenia',
    TUN: 'Republic of Tunisia',
    SAUD: 'Saudi Arabia',
    SEAL: 'Sea Launch',
    SING: 'Singapore',
  } as const;

  if (key in list) {
    return list[key as keyof typeof list];
  } else {
    return key;
  }
};

export enum RegionsEnum {
  ANYWHERE = 'ANYWHERE',
  ENGLAND = 'ENGLAND',
  NORTHERN_IRELAND = 'NORTHERN_IRELAND',
  SCOTLAND = 'SCOTLAND',
  WALES = 'WALES',
  BRITISH_OVERSEAS_TERRITORIES = 'BRITISH_OVERSEAS_TERRITORIES',
  SHANWICK = 'SHANWICK',
  NAVAREA = 'NAVAREA',
  REST_OF_THE_WORLD = 'REST_OF_THE_WORLD',
}

export type Region = {
  id: RegionsEnum;
  name: string;
};

export const Regions: {
  [key in RegionsEnum]: Region;
} = {
  [RegionsEnum.ANYWHERE]: {
    id: RegionsEnum.ANYWHERE,
    name: 'Anywhere in the United Kingdom',
  },
  [RegionsEnum.ENGLAND]: {
    id: RegionsEnum.ENGLAND,
    name: 'England',
  },
  [RegionsEnum.SCOTLAND]: {
    id: RegionsEnum.SCOTLAND,
    name: 'Scotland',
  },
  [RegionsEnum.WALES]: {
    id: RegionsEnum.WALES,
    name: 'Wales',
  },
  [RegionsEnum.NORTHERN_IRELAND]: {
    id: RegionsEnum.NORTHERN_IRELAND,
    name: 'Northern Ireland',
  },
  [RegionsEnum.BRITISH_OVERSEAS_TERRITORIES]: {
    id: RegionsEnum.BRITISH_OVERSEAS_TERRITORIES,
    name: 'British Overseas Territories and Crown Dependencies',
  },
  [RegionsEnum.SHANWICK]: {
    id: RegionsEnum.SHANWICK,
    name: 'Shanwick Airspace',
  },
  [RegionsEnum.NAVAREA]: {
    id: RegionsEnum.NAVAREA,
    name: 'UK NAVAREA',
  },
  [RegionsEnum.REST_OF_THE_WORLD]: {
    id: RegionsEnum.REST_OF_THE_WORLD,
    name: 'Rest of the World (for UK licensed satellites only)',
  },
};

export const jsonRegionsMap: Record<string, string> = {
  england_nation: 'England',
  northern_ireland_nation: 'Northern Ireland',
  scotland_nation: 'Scotland',
  wales_nation: 'Wales',
  east_of_england: 'East of England',
  east_midlands: 'East Midlands',
  london: 'London',
  north_east: 'North East',
  north_west: 'North West',
  south_east: 'South East',
  south_west: 'South West',
  west_midlands: 'West Midlands',
  yorkshire_and_north_humber: 'Yorkshire and North Humber',
  antrim_and_newtownabbey: 'Antrim and Newtownabbey',
  ards_and_north_down: 'Ards and North Down',
  armagh_city_banbridge_and_craigavon: 'Armagh City, Banbridge and Craigavon',
  belfast: 'Belfast',
  causeway_coast_and_glens: 'Causeway Coast and Glens',
  derry_and_strabane: 'Derry and Strabane',
  fermanagh_and_omagh: 'Fermanagh and Omagh',
  lisburn_and_castlereagh: 'Lisburn and Castlereagh',
  mid_and_east_antrim: 'Mid and East Antrim',
  mid_ulster: 'Mid Ulster',
  newry_mourne_and_down: 'Newry, Mourne and Down',
  central_scotland: 'Central Scotland',
  glasgow: 'Glasgow',
  highlands_and_islands: 'Highlands and Islands',
  lothian: 'Lothian',
  mid_scotland_and_fife: 'Mid Scotland and Fife',
  north_east_scotland: 'North East Scotland',
  south_scotland: 'South Scotland',
  west_scotland: 'West Scotland',
  north_wales: 'North Wales',
  mid_wales: 'Mid Wales',
  south_west_wales: 'South West Wales',
  south_east_wales: 'South East Wales',
  anguilla: 'Anguilla',
  bermuda: 'Bermuda',
  british_antarctic_territory: 'British Antarctic Territory',
  british_indian_ocean_territory: 'British Indian Ocean Territory',
  british_virgin_islands: 'British Virgin Islands',
  cayman_islands: 'Cayman Islands',
  falkland_islands: 'Falkland Islands',
  gibraltar: 'Gibraltar',
  montserrat: 'Montserrat',
  pitcairn_islands: 'Pitcairn Islands',
  saint_helena_ascension_and_tristan_da_cunha:
    'Saint Helena, Ascension and Tristan da Cunha',
  south_georgia_and_the_south_sandwich_islands:
    'South Georgia and the South Sandwich Islands',
  sovereign_base_areas_of_akrotiri_and_dhekelia:
    'Sovereign Base Areas of Akrotiri and Dhekelia',
  turks_and_caicos_islands: 'Turks and Caicos Islands',
  isle_of_man: 'Isle of Man',
  jersey: 'Jersey',
  guernsey: 'Guernsey',
  ukNavarea: 'UK NAVAREA',
  shanwickAirspace: 'Shanwick Airspace',
};
