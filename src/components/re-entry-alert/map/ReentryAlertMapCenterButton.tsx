import { useTranslations } from 'next-intl';
import { IoLocateOutline } from 'react-icons/io5';
import { useMap } from 'react-map-gl';

import Button from '@/ui/button/button';

const ReentryAlertMapCenterButton = () => {
  const t = useTranslations('OverflightMap');
  const { current: map } = useMap();

  const onClick = () => map?.flyTo({ center: [-2, 54], zoom: 4 });

  return (
    <div className="absolute top-auto bottom-2 right-2 z-50 flex flex-col">
      <Button
        variant="secondary"
        className="mb-0 bg-white"
        aria-label="Zoom in on map"
        title="Zoom in on map"
        onClick={() => map?.zoomTo((map.getZoom?.() ?? 4) + 1)}
      >
        +
      </Button>
      <Button
        variant="secondary"
        className="mb-0 bg-white"
        aria-label="Zoom out on map"
        title="Zoom out on map"
        onClick={() => map?.zoomTo((map.getZoom?.() ?? 4) - 1)}
      >
        −
      </Button>
      <Button className="mb-0 bg-white" onClick={onClick} variant="secondary" aria-label={t('center_button')} title="Recentre on UK"><IoLocateOutline /></Button>
    </div>
  );
};

export { ReentryAlertMapCenterButton };
