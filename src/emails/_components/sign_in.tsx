import { createTranslator } from 'next-intl';

import messages from '@/locales/en.json';

import { Link } from './link';
import { Text } from './text';

type SignInProps = {
  link: string;
};

export const SignIn = ({ link }: SignInProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails',
    messages,
  });

  return (
    <Text>
      {t.rich('sign_in_to_monitor_space_hazards', {
        link: chunks => <Link href={link}>{chunks}</Link>,
      })}
    </Text>
  );
};
