import { useTranslations } from 'next-intl';

type FragmentationGuidanceOnResponseProps = {
  dataPdf?: string;
};

const FragmentationGuidanceOnResponse = ({ dataPdf }: FragmentationGuidanceOnResponseProps) => {
  const t = useTranslations('Fragmentation.Guidance_on_response');

  return (
    <div data-pdf={dataPdf}>
      <h4 className="govuk-heading-m">{t('uk_response.title')}</h4>
      {t.rich('uk_response.content')}
      <h4 className="govuk-heading-m">{t('press_attention.title')}</h4>
      {t.rich('press_attention.empty')}
    </div>
  );
};

export { FragmentationGuidanceOnResponse };
