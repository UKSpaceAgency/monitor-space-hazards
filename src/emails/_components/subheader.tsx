import { Section, Text } from '@react-email/components';

import type { TypeRisk } from '@/__generated__/data-contracts';

import { riskColours } from '../_utils/utils';

const styles = {
  closedown: {
    background: '#e5e6e7',
    text: '#282d30',
  },
  confirmed: {
    background: '#cfe4dc',
    text: '#083d29',
  },
};

type SubheaderProps = {
  risk?: TypeRisk | null;
  comment?: string | null;
  title?: string;
  tone?: keyof typeof styles;
};

export const Subheader = ({ risk, comment, title, tone = 'closedown' }: SubheaderProps) => {
  const style = risk ? riskColours[risk] : styles[tone];

  const riskTitle = risk ? risk === 'None' ? 'No risk' : `${risk} risk` : (title ?? 'Closed');

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
          {riskTitle}
          {comment && (
            <>
              {title ? ' ' : ' - '}
              {comment}
            </>
          )}
        </Text>
      </Section>
    </Section>
  );
};
