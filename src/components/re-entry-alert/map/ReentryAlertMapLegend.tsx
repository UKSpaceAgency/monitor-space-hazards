'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { IoEllipseSharp, IoTriangleSharp } from 'react-icons/io5';

const ReentryAlertMapLegend = () => {
  const t = useTranslations('OverflightMap.tooltip');
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    let fullScreenChange;

    if ('onfullscreenchange' in window.document) {
      fullScreenChange = 'fullscreenchange';
    } else if ('onmozfullscreenchange' in window.document) {
      fullScreenChange = 'mozfullscreenchange';
    } else if ('onwebkitfullscreenchange' in window.document) {
      fullScreenChange = 'webkitfullscreenchange';
    } else if ('onmsfullscreenchange' in window.document) {
      fullScreenChange = 'MSFullscreenChange';
    }

    if (fullScreenChange) {
      window.document.addEventListener(fullScreenChange, () => {
        setIsFullScreen(!!document.fullscreenElement);
      });
    }
  }, []);

  return (
    <div className={clsx('absolute bottom-[60px] md:bottom-2 right-2 bg-white p-2', isFullScreen ? 'block' : 'hidden')}>
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-bold">Key</h4>
        <div className="flex items-center gap-2">
          <IoEllipseSharp className="size-6" />
          <span>{t('overflight')}</span>
        </div>
        <div className="flex items-center gap-2">
          <IoTriangleSharp className="size-6" />
          <span>{t('fragments')}</span>
        </div>
      </div>
    </div>
  );
};

export { ReentryAlertMapLegend };
