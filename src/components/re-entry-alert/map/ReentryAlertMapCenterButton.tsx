import { IoLocateOutline } from 'react-icons/io5';
import { LiaGlobeEuropeSolid } from 'react-icons/lia';
import { useMap } from 'react-map-gl';

import Button from '@/ui/button/button';

const ReentryAlertMapCenterButton = () => {
  const { current: map } = useMap();

  const handleLocationCenter = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      map?.flyTo({ center: [position.coords.longitude, position.coords.latitude], zoom: 4 });
    });
  };

  const handleUkCenter = () => {
    map?.flyTo({ center: [-2, 54], zoom: 4 });
  };

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
      {navigator.geolocation && <Button className="mb-0 bg-white" onClick={handleLocationCenter} variant="secondary" aria-label="Centre on your location" title="Centre on your location"><IoLocateOutline /></Button>}
      <Button className="mb-0 bg-white" onClick={handleUkCenter} variant="secondary" aria-label="Recentre on UK" title="Recentre on UK"><LiaGlobeEuropeSolid /></Button>
    </div>
  );
};

export { ReentryAlertMapCenterButton };
