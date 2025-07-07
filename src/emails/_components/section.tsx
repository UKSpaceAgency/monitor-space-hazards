import { Heading, Section as EmailSection } from '@react-email/components';
import type { ComponentPropsWithRef } from 'react';

import { Separator } from './separator';

type SectionProps = {
  title: string;
} & ComponentPropsWithRef<'div'>;

export const Section = ({ children, className, style, title }: SectionProps) => {
  return (
    <EmailSection className={className} style={style}>
      <Heading className="text-base m-0">
        {title}
      </Heading>
      <Separator />
      <EmailSection>
        {children}
      </EmailSection>
    </EmailSection>
  );
};
