import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeFragmentationEvent } from '@/__generated__/data-contracts';
import type { ScreeningResults } from '@/actions/getFragmentationEventScreeningResults';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import messages from '@/locales/en.json';

import { Table } from '../table';

type FragmentationEventSummaryProps = {
  event: TypeFragmentationEvent;
  screeningResults: ScreeningResults[];
} & ComponentProps<'table'>;

export const FragmentationEventSummary = ({ event, screeningResults, ...props }: FragmentationEventSummaryProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Fragmentation.Event_summary',
    messages,
  });

  const data = [
    [t('time'), `${dayjs(event.event_epoch).format(FORMAT_FULL_DATE_TIME)}`],
    [t('number_of_known_fragments'), event.known_fragments ?? 'Unknown'],
    [t('number_of_modelled_fragments'), event.modelled_fragments ?? 'Unknown'],
    [t('uk_satellites_affected'), screeningResults.length],
    [t('affected_regime'), event.affected_regime],
    [t('potential_cause_of_fragmentation'), event.fragmentation_type],
  ];

  return <Table data={data} {...props} />;
};
