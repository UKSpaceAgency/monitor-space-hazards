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
                <table
                  width="16"
                  style={{
                    borderCollapse: 'collapse',
                    borderSpacing: 0,
                  }}
                >
                  <tr>
                    <td
                      width="16"
                      height="16"
                      style={{
                        backgroundColor: '#3D3D3D',
                        borderRadius: '8px', // or '0' for square
                        lineHeight: '16px',
                        width: '16px',
                        height: '16px',
                        padding: 0,
                        textAlign: 'center',
                      }}
                    >
      &nbsp;
                    </td>
                  </tr>
                </table>
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
                <table
                  width="16"
                  style={{
                    borderCollapse: 'collapse',
                    borderSpacing: 0,
                  }}
                >
                  <tr>
                    <td
                      width="16"
                      height="16"
                      style={{
                        backgroundColor: '#F46A25',
                        borderRadius: '8px', // or '0' for square
                        lineHeight: '16px',
                        width: '16px',
                        height: '16px',
                        padding: 0,
                        textAlign: 'center',
                      }}
                    >
      &nbsp;
                    </td>
                  </tr>
                </table>
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
                <table
                  width="16"
                  style={{
                    borderCollapse: 'collapse',
                    borderSpacing: 0,
                  }}
                >
                  <tr>
                    <td
                      width="16"
                      height="16"
                      style={{
                        backgroundColor: '#801650',
                        borderRadius: '8px', // or '0' for square
                        lineHeight: '16px',
                        width: '16px',
                        height: '16px',
                        padding: 0,
                        textAlign: 'center',
                      }}
                    >
      &nbsp;
                    </td>
                  </tr>
                </table>
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
