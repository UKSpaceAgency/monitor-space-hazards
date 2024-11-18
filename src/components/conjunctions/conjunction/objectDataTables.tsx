import type { TypeSatelliteOut } from '@/__generated__/data-contracts';
import type { TranslatedColumnDef } from '@/types';

type ObjectDataTablesType = {
  name: string;
  primaryObject: number | boolean | string | null | undefined;
  secondaryObject: number | boolean | string | null | undefined;
};

export type ObjectDataTablesInputType<T> = {
  primaryObject: TypeSatelliteOut;
  secondaryObject: TypeSatelliteOut | null;
  locales: T;
};

export type ObjectDataGeneralType = {
  commonName: string;
  noradId: string;
  internationalDesignator: string;
  objectType: string;
};

export type ObjectDataLicenseType = {
  licenseCountry: string;
  launchSite: string;
  launchDate: string;
};

export type ObjectDataOrbitalType = {
  apogee: string;
  perigee: string;
  inclination: string;
  period: string;
};

export type ObjectDataAdditionalType = {
  shape: string;
  mass: string;
  crossSectionAvg: string;
  crossSectionMax: string;
  crossSectionMin: string;
  height: string;
  width: string;
  depth: string;
  span: string;
  diameter: string;
};

type TypeSatelliteOutKeys = {
  [K in keyof TypeSatelliteOut]: string
};

export const getObjectDataColumns = ({
  primaryObject,
  secondaryObject,
}: {
  primaryObject: string;
  secondaryObject: string;
}): TranslatedColumnDef<ObjectDataTablesType>[] => [
  {
    accessorKey: 'name',
    id: 'name',
    header: '',
    enableSorting: false,
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return <b>{value}</b>;
    },
  },
  {
    accessorKey: 'primaryObject',
    id: 'primaryObject',
    header: primaryObject,
    enableSorting: false,
  },
  {
    accessorKey: 'secondaryObject',
    id: 'secondaryObject',
    header: secondaryObject,
    enableSorting: false,
  },
];

export function getObjectDataTableData<T extends Partial<TypeSatelliteOutKeys>>({
  primaryObject,
  secondaryObject,
  locales,
}: ObjectDataTablesInputType<T>): ObjectDataTablesType[] {
  return Object.entries(locales).map(local => ({
    name: local[1],
    primaryObject: primaryObject[local[0] as keyof TypeSatelliteOut],
    secondaryObject: secondaryObject ? secondaryObject[local[0] as keyof TypeSatelliteOut] : '',
  }));
};
