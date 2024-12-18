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
  uk_navarea: 'UK NAVAREA',
  shanwick_airspace: 'Shanwick Airspace',
};

export const countries = {
  AF: 'Afghanistan',
  AX: 'Aland Islands',
  AL: 'Albania',
  DZ: 'Algeria',
  AS: 'American Samoa',
  AD: 'Andorra',
  AO: 'Angola',
  AI: 'Anguilla',
  AQ: 'Antarctica',
  AG: 'Antigua And Barbuda',
  AR: 'Argentina',
  AM: 'Armenia',
  AW: 'Aruba',
  AU: 'Australia',
  AT: 'Austria',
  AZ: 'Azerbaijan',
  BS: 'Bahamas',
  BH: 'Bahrain',
  BD: 'Bangladesh',
  BB: 'Barbados',
  BY: 'Belarus',
  BE: 'Belgium',
  BZ: 'Belize',
  BJ: 'Benin',
  BM: 'Bermuda',
  BT: 'Bhutan',
  BO: 'Bolivia',
  BA: 'Bosnia And Herzegovina',
  BW: 'Botswana',
  BV: 'Bouvet Island',
  BR: 'Brazil',
  IO: 'British Indian Ocean Territory',
  BN: 'Brunei Darussalam',
  BG: 'Bulgaria',
  BF: 'Burkina Faso',
  BI: 'Burundi',
  KH: 'Cambodia',
  CM: 'Cameroon',
  CA: 'Canada',
  CV: 'Cape Verde',
  KY: 'Cayman Islands',
  CF: 'Central African Republic',
  TD: 'Chad',
  CL: 'Chile',
  CN: 'China',
  CX: 'Christmas Island',
  CC: 'Cocos (Keeling) Islands',
  CO: 'Colombia',
  KM: 'Comoros',
  CG: 'Congo',
  CD: 'Congo, Democratic Republic',
  CK: 'Cook Islands',
  CR: 'Costa Rica',
  CI: 'Cote D"Ivoire',
  HR: 'Croatia',
  CU: 'Cuba',
  CY: 'Cyprus',
  CZ: 'Czech Republic',
  DK: 'Denmark',
  DJ: 'Djibouti',
  DM: 'Dominica',
  DO: 'Dominican Republic',
  EC: 'Ecuador',
  EG: 'Egypt',
  SV: 'El Salvador',
  GQ: 'Equatorial Guinea',
  ER: 'Eritrea',
  EE: 'Estonia',
  ET: 'Ethiopia',
  FK: 'Falkland Islands (Malvinas)',
  FO: 'Faroe Islands',
  FJ: 'Fiji',
  FI: 'Finland',
  FR: 'France',
  GF: 'French Guiana',
  PF: 'French Polynesia',
  TF: 'French Southern Territories',
  GA: 'Gabon',
  GM: 'Gambia',
  GE: 'Georgia',
  DE: 'Germany',
  GH: 'Ghana',
  GI: 'Gibraltar',
  GR: 'Greece',
  GL: 'Greenland',
  GD: 'Grenada',
  GP: 'Guadeloupe',
  GU: 'Guam',
  GT: 'Guatemala',
  GG: 'Guernsey',
  GN: 'Guinea',
  GW: 'Guinea-Bissau',
  GY: 'Guyana',
  HT: 'Haiti',
  HM: 'Heard Island & Mcdonald Islands',
  VA: 'Holy See (Vatican City State)',
  HN: 'Honduras',
  HK: 'Hong Kong',
  HU: 'Hungary',
  IS: 'Iceland',
  IN: 'India',
  ID: 'Indonesia',
  IR: 'Iran, Islamic Republic Of',
  IQ: 'Iraq',
  IE: 'Ireland',
  IM: 'Isle Of Man',
  IL: 'Israel',
  IT: 'Italy',
  JM: 'Jamaica',
  JP: 'Japan',
  JE: 'Jersey',
  JO: 'Jordan',
  KZ: 'Kazakhstan',
  KE: 'Kenya',
  KI: 'Kiribati',
  KR: 'Korea',
  KP: 'North Korea',
  KW: 'Kuwait',
  KG: 'Kyrgyzstan',
  LA: 'Lao People"s Democratic Republic',
  LV: 'Latvia',
  LB: 'Lebanon',
  LS: 'Lesotho',
  LR: 'Liberia',
  LY: 'Libyan Arab Jamahiriya',
  LI: 'Liechtenstein',
  LT: 'Lithuania',
  LU: 'Luxembourg',
  MO: 'Macao',
  MK: 'Macedonia',
  MG: 'Madagascar',
  MW: 'Malawi',
  MY: 'Malaysia',
  MV: 'Maldives',
  ML: 'Mali',
  MT: 'Malta',
  MH: 'Marshall Islands',
  MQ: 'Martinique',
  MR: 'Mauritania',
  MU: 'Mauritius',
  YT: 'Mayotte',
  MX: 'Mexico',
  FM: 'Micronesia, Federated States Of',
  MD: 'Moldova',
  MC: 'Monaco',
  MN: 'Mongolia',
  ME: 'Montenegro',
  MS: 'Montserrat',
  MA: 'Morocco',
  MZ: 'Mozambique',
  MM: 'Myanmar',
  NA: 'Namibia',
  NR: 'Nauru',
  NP: 'Nepal',
  NL: 'Netherlands',
  AN: 'Netherlands Antilles',
  NC: 'New Caledonia',
  NZ: 'New Zealand',
  NI: 'Nicaragua',
  NE: 'Niger',
  NG: 'Nigeria',
  NU: 'Niue',
  NF: 'Norfolk Island',
  MP: 'Northern Mariana Islands',
  NO: 'Norway',
  OM: 'Oman',
  PK: 'Pakistan',
  PW: 'Palau',
  PS: 'Palestinian Territory, Occupied',
  PA: 'Panama',
  PG: 'Papua New Guinea',
  PY: 'Paraguay',
  PE: 'Peru',
  PH: 'Philippines',
  PN: 'Pitcairn',
  PL: 'Poland',
  PT: 'Portugal',
  PR: 'Puerto Rico',
  QA: 'Qatar',
  RE: 'Reunion',
  RO: 'Romania',
  RU: 'Russian Federation',
  RW: 'Rwanda',
  BL: 'Saint Barthelemy',
  SH: 'Saint Helena',
  KN: 'Saint Kitts And Nevis',
  LC: 'Saint Lucia',
  MF: 'Saint Martin',
  PM: 'Saint Pierre And Miquelon',
  VC: 'Saint Vincent And Grenadines',
  WS: 'Samoa',
  SM: 'San Marino',
  ST: 'Sao Tome And Principe',
  SA: 'Saudi Arabia',
  SN: 'Senegal',
  RS: 'Serbia',
  SC: 'Seychelles',
  SL: 'Sierra Leone',
  SG: 'Singapore',
  SK: 'Slovakia',
  SI: 'Slovenia',
  SB: 'Solomon Islands',
  SO: 'Somalia',
  ZA: 'South Africa',
  GS: 'South Georgia And Sandwich Isl.',
  ES: 'Spain',
  LK: 'Sri Lanka',
  SD: 'Sudan',
  SR: 'Suriname',
  SJ: 'Svalbard And Jan Mayen',
  SZ: 'Swaziland',
  SE: 'Sweden',
  CH: 'Switzerland',
  SY: 'Syrian Arab Republic',
  TW: 'Taiwan',
  TJ: 'Tajikistan',
  TZ: 'Tanzania',
  TH: 'Thailand',
  TL: 'Timor-Leste',
  TG: 'Togo',
  TK: 'Tokelau',
  TO: 'Tonga',
  TT: 'Trinidad And Tobago',
  TN: 'Tunisia',
  TR: 'Turkey',
  TM: 'Turkmenistan',
  TC: 'Turks And Caicos Islands',
  TV: 'Tuvalu',
  UG: 'Uganda',
  UA: 'Ukraine',
  AE: 'United Arab Emirates',
  GB: 'United Kingdom',
  US: 'United States',
  UM: 'United States Outlying Islands',
  UY: 'Uruguay',
  UZ: 'Uzbekistan',
  VU: 'Vanuatu',
  VE: 'Venezuela',
  VN: 'Vietnam',
  VG: 'Virgin Islands, British',
  VI: 'Virgin Islands, U.S.',
  WF: 'Wallis And Futuna',
  EH: 'Western Sahara',
  YE: 'Yemen',
  ZM: 'Zambia',
  ZW: 'Zimbabwe',
};
