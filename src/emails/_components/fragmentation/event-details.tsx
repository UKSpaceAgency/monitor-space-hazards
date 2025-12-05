import { Column, Row, Section } from '@react-email/components';
import clsx from 'clsx';
import { createTranslator } from 'next-intl';
import type { ComponentProps } from 'react';

import type { TypeFragmentationReportOut } from '@/__generated__/data-contracts';
import messages from '@/locales/en.json';

type FragmentationEventDetailsProps = {
  report: TypeFragmentationReportOut;
} & ComponentProps<'table'>;

export const FragmentationEventDetails = ({ report, ...props }: FragmentationEventDetailsProps) => {
  const t = createTranslator({
    locale: 'en',
    namespace: 'Emails.Fragmentation.Event_details',
    messages,
  });

  const haveSecondaryObject = report.secondary_object_common_name && report.secondary_object_common_name !== null;

  const columnsWidth = haveSecondaryObject ? 'w-1/3' : 'w-1/2';

  const data = [
    [t('object'), report.primary_object_common_name, report.secondary_object_common_name],
    [t('object_type'), report.primary_object_type, report.secondary_object_type],
    [t('norad_id'), report.primary_object_norad_id, report.secondary_object_norad_id],
    [t('licensing_country'), report.primary_object_licensing_country, report.secondary_object_licensing_country],
    [t('estimated_mass'), `${report.primary_object_mass ?? 'Unknown'} kg`, `${report.secondary_object_mass ?? 'Unknown'} kg`],
    [t('launch_date'), report.primary_object_launching_year, report.secondary_object_launching_year],
    [t('apogee'), `${report.primary_object_apogee ?? 'Unknown'} km`, `${report.secondary_object_apogee ?? 'Unknown'} km`],
    [t('perigee'), `${report.primary_object_perigee ?? 'Unknown'} km`, `${report.secondary_object_perigee ?? 'Unknown'} km`],
    [t('inclination'), `${report.primary_object_inclination ?? 'Unknown'}°`, `${report.secondary_object_inclination ?? 'Unknown'}°`],
  ];
  return (
    <Section {...props}>
      <Row
        className="text-sm !w-full"
      >
        <Column className={`${columnsWidth} p-2 font-bold`}>{t('object_and_orbit_details')}</Column>
        <Column className={`font-bold text-center ${columnsWidth} p-2`}>{t('primary')}</Column>
        {haveSecondaryObject && <Column className={`font-bold text-center ${columnsWidth} p-2`}>{t('secondary')}</Column>}
      </Row>
      {data.map(([header, primary, secondary], index) => {
        return (
          <Row
            key={header}
            className={clsx('text-sm !w-full', {
              'bg-[#f0f0f0]': index % 2 === 0,
            })}
          >
            <Column className={`font-bold ${columnsWidth} p-2`}>{header}</Column>
            <Column className={`${columnsWidth} text-center p-2`}>
              {primary}
            </Column>
            {haveSecondaryObject && (
              <Column className={`${columnsWidth} text-center p-2`}>
                {secondary}
              </Column>
            )}
          </Row>
        );
      })}
    </Section>
  );
};
