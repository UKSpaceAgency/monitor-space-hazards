declare module '@ag-media/react-pdf-table' {
  import type { CSSProperties, FC, ReactNode } from 'react';

  export const Table: FC<{ children: ReactNode; style?: CSSProperties; weightings?: number[]; tdStyle?: CSSProperties }>;
  export const TR: FC<{ children: ReactNode; style?: CSSProperties }>;
  export const TD: FC<{ children: ReactNode; style?: CSSProperties; weighting?: number }>;
  export const TH: FC<{ children: ReactNode; style?: CSSProperties }>;
}
