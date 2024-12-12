import { useMap } from 'react-map-gl';

import Button from '@/ui/button/button';

const ReentryAlertMapCenterButton = () => {
  const { current: map } = useMap();

  const onClick = () => {
    if (map) {
      map.flyTo({ center: [-2, 54], zoom: 4 });
    }
  };

  return <div className="absolute top-auto bottom-0 left-0 z-50"><Button className="mb-0" onClick={onClick}>Zoom to UK</Button></div>;
};

export { ReentryAlertMapCenterButton };
