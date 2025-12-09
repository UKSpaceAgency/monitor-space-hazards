import { Img, Section } from '@react-email/components';

export const Separator = () => {
  return (
    <Section className="py-1.5 !w-full">
      <Img src="{{SEPARATOR.src}}" width="100%" height="1" />
    </Section>

  );
};
