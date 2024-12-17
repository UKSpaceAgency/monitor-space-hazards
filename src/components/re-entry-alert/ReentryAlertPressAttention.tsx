import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type ReentryAlertPressAttentionProps = {
  pressAttention?: string | null;
};

const ReentryAlertPressAttention = ({ pressAttention }: ReentryAlertPressAttentionProps) => {
  const t = useTranslations('Reentry_alert.Press_attention');
  return (
    <div>
      {pressAttention ? <Markdown>{pressAttention}</Markdown> : <p>{t('empty')}</p>}
    </div>
  );
};

export { ReentryAlertPressAttention };
