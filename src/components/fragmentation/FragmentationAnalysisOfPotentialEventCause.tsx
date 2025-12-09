import { useTranslations } from 'next-intl';

import { Markdown } from '../Markdown';

type FragmentationAnalysisOfPotentialEventCauseProps = {
  comment?: string | null;
};

const FragmentationAnalysisOfPotentialEventCause = ({ comment }: FragmentationAnalysisOfPotentialEventCauseProps) => {
  const t = useTranslations('Fragmentation.Analysis_of_potential_event_cause');
  return (
    <div>
      {comment ? <Markdown>{comment}</Markdown> : <p className="govuk-body">{t('empty')}</p>}
    </div>
  );
};

export { FragmentationAnalysisOfPotentialEventCause };
