import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type ConjunctionAlertPressAttentionProps = {
  pressAttentionComment?: string | null;
  dataPdf?: string;
};

const ConjunctionAlertPressAttention = ({ pressAttentionComment, dataPdf }: ConjunctionAlertPressAttentionProps) => {
  const t = useTranslations('Conjunction_alert.Guidance_on_response');
  return (
    <div data-pdf={dataPdf}>
      {pressAttentionComment ? <Markdown>{pressAttentionComment}</Markdown> : <p className="govuk-body">{t('press_attention.empty')}</p>}
    </div>
  );
};

export { ConjunctionAlertPressAttention };
