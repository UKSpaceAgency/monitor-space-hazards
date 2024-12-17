'use client';

import { useEffect, useRef, useState } from 'react';

export type UseInViewportOptions = {
  checkEdge?: 'both' | 'width' | 'height';
  debounceTime?: number;
};

const defaultViewports = [470, 641, 769];

export function useInViewport(
  viewports: number[] = defaultViewports,
  {
    checkEdge = 'both',
    debounceTime = 200,
  }: UseInViewportOptions = {},
) {
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [inViewports, setInViewports] = useState(Array(viewports.length).fill(true));

  useEffect(() => {
    const debounce = (callback: () => void, time = debounceTime) => () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(callback, time);
    };

    const checkViewport = (viewport: number) => ({
      both: Math.min(window.innerWidth, window.innerHeight),
      width: window.innerWidth,
      height: window.innerHeight,
    }[checkEdge] <= viewport);

    const onResize = debounce(() => {
      setInViewports(viewports.map(viewport => checkViewport(viewport)));
    });

    onResize();
    window.addEventListener('resize', onResize);

    return () => {
      clearTimeout(debounceTimer.current as unknown as number);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return inViewports;
}
