import type { NotificationBannerProps } from '@/ui/notification-banner/notification-banner';
import NotificationBanner from '@/ui/notification-banner/notification-banner';

import { MainTopPortal } from './MainTopPortal';

const TopNotificationBanner = (props: NotificationBannerProps) => {
  return <MainTopPortal><NotificationBanner {...props} /></MainTopPortal>;
};

export { TopNotificationBanner };
