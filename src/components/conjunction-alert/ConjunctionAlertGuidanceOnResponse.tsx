import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type ConjunctionAlertGuidanceOnResponseProps = {
  ukResponseAddition?: string | null;
  pressAttentionAddition?: string | null;
  dataPdf?: string;
};

const ConjunctionAlertGuidanceOnResponse = ({ ukResponseAddition, pressAttentionAddition, dataPdf }: ConjunctionAlertGuidanceOnResponseProps) => {
  const t = useTranslations('Conjunction_alert.Guidance_on_response');
  return (
    <div data-pdf={dataPdf}>
      <h4 className="govuk-heading-m">{t('uk_response.title')}</h4>
      {t.rich('uk_response.content')}
      {ukResponseAddition && <Markdown>{ukResponseAddition}</Markdown>}
      <h4 className="govuk-heading-m">{t('press_attention.title')}</h4>
      {pressAttentionAddition ? <Markdown>{pressAttentionAddition}</Markdown> : <p className="govuk-body">{t('press_attention.empty')}</p>}
      <p className="govuk-body">{t.rich('see_press_lines', { link: chunks => <Link className="govuk-link" href="/page/definitions">{chunks}</Link> })}</p>
    </div>
  );
};

export { ConjunctionAlertGuidanceOnResponse };
