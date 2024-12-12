import { useTranslations } from 'next-intl';
import { useMap } from 'react-map-gl';

import Button from '@/ui/button/button';

const ReentryAlertMapCenterButton = () => {
  const t = useTranslations('OverflightMap');
  const { current: map } = useMap();

  const onClick = () => map?.flyTo({ center: [-2, 54], zoom: 4 });

  return <div className="absolute top-auto bottom-0 left-0 z-50"><Button className="mb-0" onClick={onClick}>{t('center_button')}</Button></div>;
};

export { ReentryAlertMapCenterButton };
