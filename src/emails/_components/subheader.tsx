import { Section, Text } from '@react-email/components';

const styles = {
  closedown: {
    backgroundColor: '#e5e6e7',
    color: '#282d30',
  },
};

export const Subheader = () => {
  return (
    <Section className="my-6">
      <Section
        className="text-center p-2"
        style={styles.closedown}
      >
        <Text
          className="text-sm font-bold m-0"
        >
          Closed
        </Text>
      </Section>

    </Section>
  );
};
