import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

import type { ButtonProps } from '../button/button';
import Button from '../button/button';
import ButtonGroup from '../button-group/button-group';

type CookieMessages = {
  heading?: string;
  actions?: ButtonProps[];
  visible?: boolean;
} & InputHTMLAttributes<HTMLDivElement>;

export type CookieBannerProps = {
  messages: CookieMessages[];
} & InputHTMLAttributes<HTMLDivElement>;

export function CookieBanner(props: CookieBannerProps) {
  const { className, messages, ...rest } = props;

  return (
    <div
      className={clsx('govuk-cookie-banner', className)}
      {...rest}
      data-nosnippet
      role="region"
      aria-label={rest['aria-label'] ?? 'Cookie banner'}
    >
      {messages.map(
        (
          { className, heading, actions, visible, children, ...rest },
          index,
        ) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={clsx(
              'govuk-cookie-banner__message',
              'govuk-width-container',
              className,
            )}
            {...rest}
          >
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-two-thirds">
                {heading && (
                  <h2
                    className={clsx(
                      'govuk-cookie-banner__heading',
                      'govuk-heading-m',
                    )}
                  >
                    {heading}
                  </h2>
                )}
                <div className="govuk-cookie-banner__content">
                  {children}
                </div>
              </div>
            </div>
            {actions && (
              <ButtonGroup>
                {actions.map(({ className, ...props }, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Button key={index} {...props} />
                ))}
              </ButtonGroup>
            )}
          </div>
        ),
      )}
    </div>
  );
}

export default CookieBanner;
