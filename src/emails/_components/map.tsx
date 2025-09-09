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
        <Column style={{ width: '25%', fontSize: '12px', verticalAlign: 'top' }}>
          <strong>Map Legend:</strong>
        </Column>
        <Column style={{ width: '25%' }}>
          <table cellPadding="0" cellSpacing="0" align="center" style={{ width: '100%' }}>
            <tr>
              <td width="20" valign="middle" style={{ paddingRight: '6px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#3D3D3D',
                    borderRadius: '50%',
                  }}
                >
&nbsp;
                </span>
              </td>
              <td style={{ fontSize: '12px', verticalAlign: 'middle' }}>
                Object flightpath
              </td>
            </tr>
          </table>
        </Column>
        <Column style={{ width: '25%' }}>
          <table cellPadding="0" cellSpacing="0" align="center" style={{ width: '100%' }}>
            <tr>
              <td width="20" valign="middle" style={{ paddingRight: '6px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#F46A25',
                    borderRadius: '50%',
                  }}
                >
&nbsp;
                </span>
              </td>
              <td style={{ fontSize: '12px', verticalAlign: 'middle' }}>
                Chance the object enters atmosphere
              </td>
            </tr>
          </table>
        </Column>
        <Column style={{ width: '25%' }}>
          <table cellPadding="0" cellSpacing="0" align="center" style={{ width: '100%' }}>
            <tr>
              <td width="20" valign="middle" style={{ paddingRight: '6px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#801650',
                    borderRadius: '50%',
                  }}
                >
&nbsp;
                </span>
              </td>
              <td style={{ fontSize: '12px', verticalAlign: 'middle' }}>
                Chance fragments reach the ground
              </td>
            </tr>
          </table>
        </Column>
      </Row>
    </Section>
  );
};
