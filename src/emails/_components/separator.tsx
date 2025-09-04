import { Section } from '@react-email/components';

export const Separator = () => {
  return (
    <Section className="py-1.5 !w-full">
      <table
        style={{
          width: '100% !important',
          borderCollapse: 'collapse',
          padding: '0',
          margin: '0',
        }}
        cellPadding={0}
        cellSpacing={0}
        border={0}
      >
        <tr>
          <td
            style={{
              padding: '0',
              margin: '0',
              height: '1px',
              backgroundColor: '#006ebb',
              fontSize: '0',
              lineHeight: '0',
            }}
          >
            &nbsp;
          </td>
        </tr>
      </table>
    </Section>

  );
};
