import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type FragmentationGuidanceOnResponseProps = {
  comment?: string | null;
  dataPdf?: string;
};

const FragmentationGuidanceOnResponse = ({ comment, dataPdf }: FragmentationGuidanceOnResponseProps) => {
  const t = useTranslations('Fragmentation.Guidance_on_response');

  return (
    <div data-pdf={dataPdf}>
      <h4 className="govuk-heading-s">{t('title')}</h4>
      {comment ? <Markdown>{comment}</Markdown> : <p className="govuk-body">{t('empty')}</p>}
    </div>
  );
};

export { FragmentationGuidanceOnResponse };
