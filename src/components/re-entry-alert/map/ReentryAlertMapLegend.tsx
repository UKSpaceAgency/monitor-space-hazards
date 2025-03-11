import { useTranslations } from 'next-intl';
import { IoEllipseSharp, IoTriangleSharp } from 'react-icons/io5';

const ReentryAlertMapLegend = () => {
  const t = useTranslations('OverflightMap.tooltip');

  return (
    <div className="absolute bottom-2 right-2 bg-white p-2">
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
