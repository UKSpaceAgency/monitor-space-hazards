import { Section, Text } from '@react-email/components';

import type { TypeReentryRisk } from '@/__generated__/data-contracts';

import { riskColours } from '../_utils/utils';

const styles = {
  closedown: {
    background: '#e5e6e7',
    text: '#282d30',
  },
};

type SubheaderProps = {
  risk?: TypeReentryRisk | null;
};

export const Subheader = ({ risk }: SubheaderProps) => {
  const style = risk ? riskColours[risk] : styles.closedown;

  return (
    <Section className="py-6 !w-full">
      <Section
        className="text-center p-2 !w-full"
        style={{ backgroundColor: style.background }}
      >
        <Text
          className="text-sm font-bold m-0"
          style={{ color: style.text }}
        >
          {risk ? `${risk} Risk` : 'Closed'}
        </Text>
      </Section>

    </Section>
  );
};
