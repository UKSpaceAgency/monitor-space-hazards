import clsx from 'clsx';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';

type PanelProps = {
  heading?: ReactNode;
  headingLevel?: ElementType;
} & HTMLAttributes<HTMLDivElement>;

export function Panel({
  heading,
  headingLevel = 'h1',
  className,
  children,
  ...props
}: PanelProps) {
  const Heading = headingLevel;

  return (
    <div className={clsx('govuk-panel', 'govuk-panel--confirmation', className)} {...props}>
      {heading && (
        <Heading className="govuk-panel__title">{heading}</Heading>
      )}
      <div className="govuk-panel__body">{children}</div>
    </div>
  );
}

export default Panel;
