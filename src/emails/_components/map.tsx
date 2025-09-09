import { Column, Img, Row, Section } from '@react-email/components';
import type { ComponentProps } from 'react';

type MapProps = {
  src: string;
} & ComponentProps<'table'>;

export const Map = ({ src, ...props }: MapProps) => {
  return (
    <Section {...props}>
      <Img src={src} alt="map" className="w-full h-auto block outline-none border-none" />
      <Row>
        <Column className="w-1/4 text-xs">
          Map Legend:
        </Column>
        <Column className="w-1/4">
          <Row cellSpacing={6} align="center">
            <Column className="w-4">
              <div className="size-4 bg-[#3D3D3D] rounded-full">&nbsp;</div>
            </Column>
            <Column className="text-xs">
              Object flightpath
            </Column>
          </Row>
        </Column>
        <Column className="w-1/4">
          <Row cellSpacing={6} align="center">
            <Column>
              <div className="size-4 bg-[#F46A25] rounded-full">&nbsp;</div>
            </Column>
            <Column className="text-xs">
              Change the object enters atmosphere
            </Column>
          </Row>
        </Column>
        <Column className="w-1/4">
          <Row cellSpacing={6} align="center">
            <Column>
              <div className="size-4 bg-[#801650] rounded-full">&nbsp;</div>
            </Column>
            <Column className="text-xs">
              Chane fragments reach the ground
            </Column>
          </Row>
        </Column>
      </Row>
    </Section>
  );
};
