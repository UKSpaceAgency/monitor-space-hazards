import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type FragmentationGuidanceOnResponseProps = {
  ukResponse?: string | null;
  pressAttention?: string | null;
  dataPdf?: string;
};

const FragmentationGuidanceOnResponse = ({ ukResponse, pressAttention, dataPdf }: FragmentationGuidanceOnResponseProps) => {
  const t = useTranslations('Fragmentation.Guidance_on_response');

  return (
    <div data-pdf={dataPdf}>
      <h4 className="govuk-heading-m">{t('uk_response.title')}</h4>
      {ukResponse ? <Markdown>{ukResponse}</Markdown> : t.rich('uk_response.content')}
      <h4 className="govuk-heading-m">{t('press_attention.title')}</h4>
      {pressAttention ? <Markdown>{pressAttention}</Markdown> : <p className="govuk-body">{t('press_attention.empty')}</p>}
    </div>
  );
};

export { FragmentationGuidanceOnResponse };
