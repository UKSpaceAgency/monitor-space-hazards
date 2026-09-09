import { Heading, Img, Section, Text } from '@react-email/components';

import { Separator } from './separator';

type HeaderProps = {
  title?: string;
  subtitle?: string;
  banner?: string;
  official?: boolean;
  withPlaceholders: boolean;
};

export const Header = ({ title, subtitle, banner, official, withPlaceholders }: HeaderProps) => {
  return (
    <Section className="!w-full">
      {official && (
        <Text className="text-xs text-center text-[#6f777b] m-0 pb-2">OFFICIAL</Text>
      )}
      <Section className="pb-4 !w-full">
        <Img
          src={withPlaceholders ? '{{NSPOC_LOGO.src}}' : 'https://www.dev.monitor-space-hazards.service.gov.uk/nspoclogo2.png'}
          width="107"
          height="50"
          className="w-[107px] h-[50px]"
        />
      </Section>
      {banner && (
        <Section className="text-center p-2 !w-full bg-[#e5e6e7]">
          <Text className="text-sm font-bold m-0 text-[#282d30]">{banner}</Text>
        </Section>
      )}
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
