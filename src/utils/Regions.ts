export const getFullCountry = (key: string | null | undefined) => {
  if (!key) {
    return null;
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
