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
        className="mb-0"
        aria-label="Zoom in"
        onClick={() => map?.zoomTo((map.getZoom?.() ?? 4) + 1)}
      >
        +
      </Button>
      <Button
        variant="secondary"
        className="mb-0"
        aria-label="Zoom out"
        onClick={() => map?.zoomTo((map.getZoom?.() ?? 4) - 1)}
      >
        −
      </Button>
      <Button className="mb-0" onClick={onClick} variant="secondary" aria-label={t('center_button')}><IoLocateOutline /></Button>
    </div>
  );
};

export { ReentryAlertMapCenterButton };
