import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

export type NotificationBannerProps = {
  heading?: ReactNode;
  status?: 'success' | 'error' | 'important';
} & HTMLAttributes<HTMLDivElement>;

export function NotificationBanner({
  heading,
  status = 'important',
  className,
  children,
  ...props
}: NotificationBannerProps) {
  return (
    <div
      className={clsx(
        'govuk-notification-banner',
        {
          'govuk-notification-banner--success': status === 'success',
          'govuk-notification-banner--important':
            status === 'important',
          'govuk-notification-banner--error': status === 'error',
        },
        className,
      )}
      role={status !== 'important' ? 'alert' : 'status'}
      {...props}
    >
      {status !== 'error' && (
        <div className="govuk-notification-banner__header">
          <h2 className="govuk-notification-banner__title" id={props.id || 'govuk-notification-banner-title'}>
            {status.toUpperCase()}
          </h2>
        </div>
      )}
      <div className="govuk-notification-banner__content">
        {heading && (
          <p className="govuk-notification-banner__heading">
            {heading}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}

export default NotificationBanner;
