import { Column, Img, Row, Section } from '@react-email/components';
import type { ComponentProps } from 'react';

type MapProps = {
  src: string;
  showLegend?: boolean;
} & ComponentProps<'table'>;

export const Map = ({ src, showLegend = true, ...props }: MapProps) => {
  return (
    <Section {...props}>
      <Img src={src} alt="map" width="690" height="345" className="block outline-none border-none" />
      {showLegend && (
        <Row cellSpacing={8}>
          <Column className="w-1/5 text-2xs font-bold">
            Map Legend:
          </Column>
          <Column>
            <table cellPadding="0" cellSpacing="8" align="center" style={{ width: '100%' }}>
              <tr>
                <td width="20" valign="middle">
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
                          backgroundColor: '#007CC8',
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
                <td className="text-2xs">
                  Object flightpath
                </td>
              </tr>
            </table>
          </Column>
          <Column>
            <table cellPadding="0" cellSpacing="8" align="center" style={{ width: '100%' }}>
              <tr>
                <td width="20" valign="middle">
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
                          backgroundColor: '#C00000',
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
                <td className="text-2xs">
                  Potential debris field
                </td>
              </tr>
            </table>
          </Column>
        </Row>
      )}
    </Section>
  );
};
