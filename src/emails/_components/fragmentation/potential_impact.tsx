import { Column, Row, Section } from '@react-email/components';
import clsx from 'clsx';
import type { ComponentProps } from 'react';

import type { ScreeningResults } from '@/actions/getFragmentationEventScreeningResults';
import { createEmailTranslator } from '@/emails/_utils/utils';

type FragmentationPotentialImpactProps = {
  data: ScreeningResults[];
} & ComponentProps<'table'>;

export const FragmentationPotentialImpact = ({ data, ...props }: FragmentationPotentialImpactProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Fragmentation.Potential_impact' });

  return (
    <Section {...props}>
      <Row
        className="text-sm !w-full"
      >
        <Column className="w-1/5 p-2 text-center font-bold">{t('object')}</Column>
        <Column className="w-1/5 p-2 text-center font-bold">{t('norad_id')}</Column>
        <Column className="w-1/5 p-2 text-center font-bold">{t('estimated_mass')}</Column>
        <Column className="w-1/5 p-2 text-center font-bold">{t('current')}</Column>
        <Column className="w-1/5 p-2 text-center font-bold">{t('predicted')}</Column>
      </Row>
      {data.map(({ object_name, norad_id, mass, current_tally, fragments_tally }, index) => {
        return (
          <Row
            key={norad_id}
            className={clsx('text-sm !w-full', {
              'bg-[#f0f0f0]': index % 2 === 0,
            })}
          >
            <Column className="w-1/5 p-2 text-center">{object_name}</Column>
            <Column className="w-1/5 p-2 text-center">{norad_id}</Column>
            <Column className="w-1/5 p-2 text-center">
              {mass
                ? `${mass} kg`
                : 'Unknown'}
            </Column>
            <Column className="w-1/5 p-2 text-center">{current_tally}</Column>
            <Column className="w-1/5 p-2 text-center">{fragments_tally}</Column>
          </Row>
        );
      })}
    </Section>
  );
};
