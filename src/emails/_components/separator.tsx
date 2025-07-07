import { Hr } from '@react-email/components';

const styles = {
  hr: {
    borderColor: '#1d70b8',
    borderTopWidth: '2px',
  },
};

export const Separator = () => {
  return <Hr className="my-1.5" style={styles.hr} />;
};
