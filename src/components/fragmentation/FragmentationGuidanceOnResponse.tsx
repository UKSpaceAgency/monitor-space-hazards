import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type FragmentationGuidanceOnResponseProps = {
  ukResponse?: string | null;
  dataPdf?: string;
};

const FragmentationGuidanceOnResponse = ({ ukResponse, dataPdf }: FragmentationGuidanceOnResponseProps) => {
  const t = useTranslations('Fragmentation.Guidance_on_response');

  return (
    <div data-pdf={dataPdf}>
      <h4 className="govuk-heading-s">{t('title')}</h4>
      {ukResponse ? <Markdown>{ukResponse}</Markdown> : t.rich('content')}
    </div>
  );
};

export { FragmentationGuidanceOnResponse };
