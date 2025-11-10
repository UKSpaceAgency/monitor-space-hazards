import { useTranslations } from 'next-intl';

import RichText from '@/components/RichText';
import Details from '@/ui/details/details';

type AlertSettingsDetailsProps = {
  type: 'conjunction' | 're-entry';
};

const AlertSettingsDetails = ({ type }: AlertSettingsDetailsProps) => {
  const t = useTranslations('Forms.Alert_settings');

  const key = type === 'conjunction' ? 'help_conjunctions' : 'help_reentry';

  return (
    <Details summary={t.rich(`${key}.title`)}>
      <RichText>
        {tags => t.rich(`${key}.content`, tags) }
      </RichText>
    </Details>
  );
};

export { AlertSettingsDetails };
