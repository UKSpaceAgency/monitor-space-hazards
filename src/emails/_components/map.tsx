import { Img, Section } from '@react-email/components';
import type { ComponentProps } from 'react';

type MapProps = {
  src: string;
} & ComponentProps<'table'>;

export const Map = ({ src, ...props }: MapProps) => {
  return (
    <Section {...props}>
      <Img src={src} alt="map" className="w-full h-auto block outline-none border-none" />
    </Section>
  );
};
