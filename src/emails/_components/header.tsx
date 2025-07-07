import { Column, Heading, Img, Row, Section } from '@react-email/components';

import { Separator } from './separator';

type HeaderProps = {
  title: string;
  subtitle: string;
};

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <Section>
      <Row className="pb-4">
        <Column className="w-[20%]">
          <Img
            src="https://www.dev.monitor-space-hazards.service.gov.uk/nspoclogo2.png"
            className="w-full h-auto"
          />
        </Column>
        <Column />
      </Row>
      <Heading className="text-base m-0">
        {title}
      </Heading>
      <Separator />
      <Heading className="text-base m-0">
        {subtitle}
      </Heading>
      <Separator />
    </Section>
  );
};
