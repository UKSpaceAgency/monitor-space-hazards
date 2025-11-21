import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type FragmentationPressAttentionProps = {
  comment?: string | null;
  dataPdf?: string;
};

const FragmentationPressAttention = ({ comment, dataPdf }: FragmentationPressAttentionProps) => {
  const t = useTranslations('Fragmentation.Press_attention');

  return (
    <div data-pdf={dataPdf}>
      {comment ? <Markdown>{comment}</Markdown> : <p className="govuk-body">{t('empty')}</p>}
    </div>
  );
};

export { FragmentationPressAttention };
