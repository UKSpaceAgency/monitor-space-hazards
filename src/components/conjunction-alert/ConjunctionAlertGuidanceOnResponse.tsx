import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type ConjunctionAlertGuidanceOnResponseProps = {
  ukResponseComment?: string | null;
  pressAttentionComment?: string | null;
  dataPdf?: string;
};

const ConjunctionAlertGuidanceOnResponse = ({ ukResponseComment, pressAttentionComment, dataPdf }: ConjunctionAlertGuidanceOnResponseProps) => {
  const t = useTranslations('Conjunction_alert.Guidance_on_response');
  return (
    <div data-pdf={dataPdf}>
      <h4 className="govuk-heading-m">{t('uk_response.title')}</h4>
      {t.rich('uk_response.content')}
      {ukResponseComment && <Markdown>{ukResponseComment}</Markdown>}
      <h4 className="govuk-heading-m">{t('press_attention.title')}</h4>
      {pressAttentionComment
        ? (
            <Markdown>{pressAttentionComment}</Markdown>
          )
        : (
            <p className="govuk-body">{t('press_attention.empty')}</p>
          )}
    </div>
  );
};

export { ConjunctionAlertGuidanceOnResponse };
