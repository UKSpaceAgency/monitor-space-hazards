'use client';

import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

const MainTopPortal = ({ children }: { children: ReactNode }) => {
  return createPortal(
    children,
    document.getElementById('main-top-portal') as HTMLElement,
  );
};

export { MainTopPortal };
