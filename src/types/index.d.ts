import type { AccessorColumnDef, ColumnDefBase, IdIdentifier, RowData, StringHeaderIdentifier } from '@tanstack/react-table';

type ReplaceTypes<ObjType extends object, FromType, ToType> = {
  [KeyType in keyof ObjType]: ObjType[KeyType] extends object
    ? ReplaceTypes<ObjType[KeyType], FromType, ToType> // Recurse
    : ObjType[KeyType] extends FromType // Not recursing, need to change?
      ? ToType // Yes, change it
      : ObjType[KeyType]; // No, keep original
};
type Paths<Schema, Path extends string = ''> = Schema extends string
  ? Path
  : Schema extends object
    ? {
        [K in keyof Schema & string]: Paths<
          Schema[K],
        `${Path}${Path extends '' ? '' : '.'}${K}`
        >;
      }[keyof Schema & string]
    : never;

type ColumnIdentifiers<TData extends RowData, TValue> = {
  header?: Paths<IntlMessages['Tables']>;
} & IdIdentifier<TData, TValue> | StringHeaderIdentifier;

type GroupColumnDefBase<TData extends RowData, TValue = unknown> = {
  columns?: TranslatedColumnDef<TData, any>[];
} & ColumnDefBase<TData, TValue>;

type DisplayColumnDef<TData extends RowData, TValue = unknown> = ColumnDefBase<TData, TValue> & ColumnIdentifiers<TData, TValue>;

type GroupColumnDef<TData extends RowData, TValue = unknown> = GroupColumnDefBase<TData, TValue> & ColumnIdentifiers<TData, TValue>;

export type TranslatedColumnDef<TData extends RowData, TValue = unknown> = DisplayColumnDef<TData, TValue> | GroupColumnDef<TData, TValue> | AccessorColumnDef<TData, TValue>;
