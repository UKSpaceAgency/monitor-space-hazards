import { useTranslations } from 'next-intl';

import Accordion from '@/ui/accordion/accordion';

import { ActivityObjectData } from './ActivityObjectData';
import { ActivityOperatorSupport } from './ActivityOperatorSupport';

type ActivityAccordionProps = {
  noradId: string;
};

const ActivityAccordion = ({
  noradId,
}: ActivityAccordionProps) => {
  const t = useTranslations('Activity.accordion');

  return (
    <Accordion
      id="activity-event"
      initialItems={[
        {
          id: 'operator_support',
          heading: t('operator_support'),
          content: (
            <ActivityOperatorSupport />
          ),
        },
        {
          id: 'object_data',
          heading: t('object_data'),
          content: (
            <ActivityObjectData noradId={noradId} />
          ),
        },
      ]}
    />
  );
};

export { ActivityAccordion };
