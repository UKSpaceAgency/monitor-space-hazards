import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type ReentryAlertPressAttentionProps = {
  pressAttention?: string | null;
  dataPdf?: string;
};

const ReentryAlertPressAttention = ({ pressAttention, dataPdf }: ReentryAlertPressAttentionProps) => {
  const t = useTranslations('Reentry_alert.Press_attention');
  return (
    <div data-pdf={dataPdf}>
      {pressAttention ? <Markdown>{pressAttention}</Markdown> : <p>{t('empty')}</p>}
    </div>
  );
};

export { ReentryAlertPressAttention };
