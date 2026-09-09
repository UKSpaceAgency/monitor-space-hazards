import { Column, Row, Section as EmailSection } from '@react-email/components';
import clsx from 'clsx';
import { isNumber } from 'lodash';

import type { TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import type { ReentryLocation } from '@/emails/_utils/reentry-locations';
import { getOtherRegionsAtRisk } from '@/emails/_utils/reentry-locations';
import { createEmailTranslator } from '@/emails/_utils/utils';
import { roundedPercent } from '@/utils/Math';

import { Text } from '../text';

type ReentryOtherRegionsAtRiskProps = {
  report: TypeReentryEventReportOut;
};

const formatProbability = (value: number | null | undefined) =>
  isNumber(value) ? roundedPercent(value) : '-';

type RegionGroupProps = {
  title: string;
  locations: ReentryLocation[];
};

const RegionGroup = ({ title, locations }: RegionGroupProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Other_regions_at_risk' });

  return (
    <EmailSection className="!w-full pb-4">
      <Text className="text-sm m-0 font-bold">{title}</Text>
      <Row className="!w-full">
        <Column className="w-1/2 p-2 text-sm font-bold align-top">{t('location')}</Column>
        <Column className="w-1/4 p-2 text-sm font-bold align-top">{t('probability_of_reentry')}</Column>
        <Column className="w-1/4 p-2 text-sm font-bold align-top">{t('probability_of_debris_impact')}</Column>
      </Row>
      {locations.length === 0
        ? <Text className="text-sm m-0 p-2">{t('empty')}</Text>
        : locations.map((location, index) => (
            <Row
              key={location.key}
              className={clsx('!w-full', { 'bg-[#f0f0f0]': index % 2 === 0 })}
            >
              <Column className="w-1/2 p-2 text-sm font-bold align-top">{location.name}</Column>
              <Column className="w-1/4 p-2 text-sm align-top">
                {formatProbability(location.atmospheric_probability)}
              </Column>
              <Column className="w-1/4 p-2 text-sm align-top">
                {formatProbability(location.fragments_probability)}
              </Column>
            </Row>
          ))}
    </EmailSection>
  );
};

export const ReentryOtherRegionsAtRisk = ({ report }: ReentryOtherRegionsAtRiskProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Other_regions_at_risk' });

  const { ukMainland, maritimeAndAirspace, overseasTerritories } = getOtherRegionsAtRisk(report);

  return (
    <EmailSection className="!w-full">
      <Text>{t('description')}</Text>
      <RegionGroup title={t('uk_mainland')} locations={ukMainland} />
      <RegionGroup title={t('maritime_and_airspace')} locations={maritimeAndAirspace} />
      <RegionGroup title={t('overseas_territories_and_crown_dependencies')} locations={overseasTerritories} />
    </EmailSection>
  );
};
