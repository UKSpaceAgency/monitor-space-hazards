import { Img, Section } from '@react-email/components';
import type { ComponentProps } from 'react';

type MapProps = {
  src: string;
  alt: string;
} & ComponentProps<'table'>;

export const Map = ({ src, alt, ...props }: MapProps) => {
  return <Section {...props}><Img src={src} alt={alt} /></Section>;
};
