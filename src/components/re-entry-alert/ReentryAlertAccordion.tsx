import { useTranslations } from 'next-intl';

import type { TypeReentryEventOut } from '@/__generated__/data-contracts';
import Accordion from '@/ui/accordion/accordion';

import { ReentryAlertAdditionalObjectDetailsTable } from './tables/ReentryAlertAdditionalObjectDetailsTable';

type ReentryAlertAccordionProps = {
  event: TypeReentryEventOut;
};

const ReentryAlertAccordion = ({
  event,
}: ReentryAlertAccordionProps) => {
  const t = useTranslations('Accordions.ReentryAlert');

  return (
    <Accordion
      id="reentry-event"
      initialItems={[
        {
          id: 'additional_object_details',
          heading: t('additional_object_details'),
          content: (
            <ReentryAlertAdditionalObjectDetailsTable event={event} />
          ),
        },
      ]}
    />
  );
};

export { ReentryAlertAccordion };
