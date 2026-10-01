import { Column, Img, Row, Section } from '@react-email/components';
import type { ComponentProps } from 'react';

type MapProps = {
  src: string;
  showLegend?: boolean;
  width?: number | string;
} & Omit<ComponentProps<'table'>, 'width'>;

type LegendItemProps = {
  color: string;
  label: string;
};

const LegendItem = ({ color, label }: LegendItemProps) => (
  <table
    cellPadding={0}
    cellSpacing={0}
    role="presentation"
    style={{ borderCollapse: 'collapse', borderSpacing: 0 }}
  >
    <tr>
      <td
        width={16}
        height={16}
        valign="top"
        style={{
          backgroundColor: color,
          width: 16,
          height: 16,
          borderRadius: 8,
          fontSize: 0,
          lineHeight: 0,
          padding: 0,
        }}
      >
        &nbsp;
      </td>
      <td
        valign="top"
        className="text-2xs"
        style={{ paddingLeft: 8, paddingTop: 1 }}
      >
        {label}
      </td>
    </tr>
  </table>
);

export const Map = ({ src, showLegend = true, width = 580, ...props }: MapProps) => {
  const imgWidth = typeof width === 'string' ? Number.parseInt(width, 10) || 580 : width;
  // Maps are authored at a 2:1 aspect ratio (e.g. 690×345).
  const imgHeight = Math.round(imgWidth / 2);

  return (
    <Section {...props} width={imgWidth}>
      <Img
        src={src}
        alt="Map"
        width={imgWidth}
        height={imgHeight}
        style={{
          display: 'block',
          border: 0,
          outline: 'none',
          textDecoration: 'none',
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      {showLegend && (
        <Row cellSpacing={8} className="pt-2">
          <Column
            width={88}
            className="text-2xs font-bold align-top"
            style={{ width: 88, verticalAlign: 'top', textAlign: 'left' }}
          >
            Map Legend
          </Column>
          <Column
            width={120}
            className="align-top"
            style={{ width: 120, verticalAlign: 'top', textAlign: 'left' }}
          >
            <LegendItem color="#007CC8" label="Flight Path" />
          </Column>
          <Column className="align-top" style={{ verticalAlign: 'top', textAlign: 'left' }}>
            <LegendItem
              color="#C00000"
              label="Potential Debris Field"
            />
          </Column>
        </Row>
      )}
    </Section>
  );
};
