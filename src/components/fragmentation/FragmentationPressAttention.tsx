import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type FragmentationPressAttentionProps = {
  pressAttention?: string | null;
  dataPdf?: string;
};

const FragmentationPressAttention = ({ pressAttention, dataPdf }: FragmentationPressAttentionProps) => {
  const t = useTranslations('Fragmentation.Press_attention');

  return (
    <div data-pdf={dataPdf}>
      {pressAttention ? <Markdown>{pressAttention}</Markdown> : <p className="govuk-body">{t('empty')}</p>}
    </div>
  );
};

export { FragmentationPressAttention };
