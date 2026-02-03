import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type ConjunctionAlertGuidanceOnResponseProps = {
  ukResponseComment?: string | null;
  dataPdf?: string;
};

const ConjunctionAlertGuidanceOnResponse = ({ ukResponseComment, dataPdf }: ConjunctionAlertGuidanceOnResponseProps) => {
  const t = useTranslations('Conjunction_alert.Guidance_on_response');
  return (
    <div data-pdf={dataPdf}>
      {t.rich('uk_response.content')}
      {ukResponseComment && <Markdown>{ukResponseComment}</Markdown>}
    </div>
  );
};

export { ConjunctionAlertGuidanceOnResponse };
