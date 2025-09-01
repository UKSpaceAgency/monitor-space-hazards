'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoContract, IoExpand } from 'react-icons/io5';
import type { MapRef } from 'react-map-gl';

import Button from '@/ui/button/button';

type ReentryAlertMapFullscreenButtonProps = {
  mapRef: React.MutableRefObject<MapRef | null>;
};

export const ReentryAlertMapFullscreenButton = ({ mapRef }: ReentryAlertMapFullscreenButtonProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!mapRef.current) {
      return;
    }

    if (!isFullscreen) {
      // Enter fullscreen
      const mapContainer = mapRef.current.getContainer();
      if (mapContainer.requestFullscreen) {
        mapContainer.requestFullscreen();
      } else if ((mapContainer as any).webkitRequestFullscreen) {
        (mapContainer as any).webkitRequestFullscreen();
      } else if ((mapContainer as any).msRequestFullscreen) {
        (mapContainer as any).msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  }, [isFullscreen, mapRef]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleWebkitFullscreenChange = () => {
      setIsFullscreen(!!(document as any).webkitFullscreenElement);
    };

    const handleMsFullscreenChange = () => {
      setIsFullscreen(!!(document as any).msFullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleWebkitFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleMsFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleWebkitFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleMsFullscreenChange);
    };
  }, []);

  return (
    <div className="absolute top-2 right-2 z-10">
      <Button
        type="button"
        variant="secondary"
        onClick={toggleFullscreen}
        className="mb-0"
        aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        {isFullscreen
          ? (
              <IoContract />
            )
          : (
              <IoExpand />
            )}
      </Button>
    </div>
  );
};
