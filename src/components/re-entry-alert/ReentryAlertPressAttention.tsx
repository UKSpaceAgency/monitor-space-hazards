import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type ReentryAlertPressAttentionProps = {
  pressAttentionComment?: string | null;
  dataPdf?: string;
};

const ReentryAlertPressAttention = ({ pressAttentionComment, dataPdf }: ReentryAlertPressAttentionProps) => {
  const t = useTranslations('Reentry_alert.Press_attention');
  return (
    <div data-pdf={dataPdf}>
      {pressAttentionComment ? <Markdown>{pressAttentionComment}</Markdown> : <p className="govuk-body">{t('empty')}</p>}
    </div>
  );
};

export { ReentryAlertPressAttention };
