import { Heading, Img, Section } from '@react-email/components';

import { Separator } from './separator';

type HeaderProps = {
  title?: string;
  subtitle?: string;
  withPlaceholders: boolean;
};

export const Header = ({ title, subtitle, withPlaceholders }: HeaderProps) => {
  return (
    <Section className="!w-full">
      <Section className="pb-4 !w-full">
        <Img
          src={withPlaceholders ? '{{NSPOC_LOGO.src}}' : 'https://www.dev.monitor-space-hazards.service.gov.uk/nspoclogo2.png'}
          width="107"
          height="50"
          className="w-[107px] h-[50px]"
        />
      </Section>
      {title && (
        <>
          <Heading className="text-base m-0">
            {title}
          </Heading>
          <Separator />
        </>
      )}
      {subtitle && (
        <>
          <Heading className="text-base m-0">
            {subtitle}
          </Heading>
          <Separator />
        </>
      )}
    </Section>
  );
};
