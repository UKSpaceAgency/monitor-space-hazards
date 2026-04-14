import { createEmailTranslator } from '@/emails/_utils/utils';

import { Link } from './link';
import { Text } from './text';

type SignInProps = {
  link: string;
};

export const SignIn = ({ link }: SignInProps) => {
  const t = createEmailTranslator({ namespace: 'Emails' });

  return (
    <Text className="mb-0">
      {t.rich('sign_in_to_monitor_space_hazards', {
        link: chunks => <Link href={link}>{chunks}</Link>,
      })}
    </Text>
  );
};
