import { Section, Text } from '@react-email/components';

import type { TypeReentryRisk } from '@/__generated__/data-contracts';

import { riskColours } from '../_utils/utils';

const styles = {
  closedown: {
    backgroundColor: '#e5e6e7',
    color: '#282d30',
  },
};

type SubheaderProps = {
  risk?: TypeReentryRisk | null;
};

export const Subheader = ({ risk }: SubheaderProps) => {
  const style = risk ? riskColours[risk] : styles.closedown;

  return (
    <Section className="my-6">
      <Section
        className="text-center p-2"
        style={style}
      >
        <Text
          className="text-sm font-bold m-0"
        >
          {risk ? `${risk} Risk` : 'Closed'}
        </Text>
      </Section>

    </Section>
  );
};
