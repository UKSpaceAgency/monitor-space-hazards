import { Section, Text } from '@react-email/components';

import type { TypeRisk } from '@/__generated__/data-contracts';

import { riskColours } from '../_utils/utils';

const styles = {
  closedown: {
    background: '#e5e6e7',
    text: '#282d30',
  },
};

type SubheaderProps = {
  risk?: TypeRisk | null;
  comment?: string | null;
};

export const Subheader = ({ risk, comment }: SubheaderProps) => {
  const style = risk ? riskColours[risk] : styles.closedown;

  return (
    <Section className="py-6 !w-full">
      <Section
        className="text-center p-2 !w-full"
        style={{ backgroundColor: style.background }}
      >
        <Text
          className="text-sm m-0"
          style={{ color: style.text }}
        >
          {risk ? `${risk} Risk` : 'Closed'}
          {comment && (
            <>
              {' '}
              -
              {' '}
              {comment}
            </>
          )}
        </Text>
      </Section>
    </Section>
  );
};
