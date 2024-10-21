import clsx from 'clsx';
import type { HTMLAttributes } from 'react';

import Tag from '../tag/tag';

type PhaseBannerProps = {
  tag: string;
} & HTMLAttributes<HTMLDivElement>;

export function PhaseBanner({
  tag,
  className,
  children,
  ...props
}: PhaseBannerProps) {
  return (
    <div
      className={clsx('govuk-phase-banner', className)}
      {...props}
    >
      <div className="govuk-phase-banner__content">
        <Tag className="govuk-phase-banner__content__tag">{tag}</Tag>
        <span className="govuk-phase-banner__text">{children}</span>
      </div>
    </div>
  );
}

export default PhaseBanner;
