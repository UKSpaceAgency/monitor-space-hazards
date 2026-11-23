import { Column, Row, Section } from '@react-email/components';
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
        <Column className="w-1/5 px-2 py-1 font-bold">{t('object')}</Column>
        <Column className="w-1/5 px-2 py-1 font-bold">{t('norad_id')}</Column>
        <Column className="w-1/5 px-2 py-1 font-bold">{t('estimated_mass')}</Column>
        <Column className="w-1/5 px-2 py-1 font-bold">{t('current')}</Column>
        <Column className="w-1/5 px-2 py-1 font-bold">{t('predicted')}</Column>
      </Row>
      {data.map(({ object_name, norad_id, mass, current_tally, fragments_tally }) => {
        return (
          <Row
            key={norad_id}
            className="text-sm !w-full"
          >
            <Column className="w-1/5 px-2 py-1">{object_name}</Column>
            <Column className="w-1/5 px-2 py-1">{norad_id}</Column>
            <Column className="w-1/5 px-2 py-1">
              {mass
                ? `${mass} kg`
                : 'Unknown'}
            </Column>
            <Column className="w-1/5 px-2 py-1">{current_tally}</Column>
            <Column className="w-1/5 px-2 py-1">{fragments_tally}</Column>
          </Row>
        );
      })}
    </Section>
  );
};
