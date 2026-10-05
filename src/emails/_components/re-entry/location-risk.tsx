import { Column, Row, Section as EmailSection } from '@react-email/components';
import { Fragment } from 'react';

import type { ReentryLocationAtRisk } from '@/emails/_utils/reentry-locations';
import { getLocationName } from '@/emails/_utils/reentry-locations';
import { createEmailTranslator, riskColours } from '@/emails/_utils/utils';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';
import { roundedPercent } from '@/utils/Math';
import { getLocationRisk } from '@/utils/ReentryRisk';

import { Map } from '../map';
import { Section } from '../section';

type LocationRiskProps = {
  location: ReentryLocationAtRisk;
};

const formatProbability = (value: number | null | undefined) =>
  value ? roundedPercent(value) : '-';

const LabelledRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Row className="!w-full">
    <Column className="w-1/2 p-2 pl-0 text-sm font-bold align-top">{label}</Column>
    <Column className="w-1/2 p-2 text-sm align-top">{children}</Column>
  </Row>
);

export const LocationRisk = ({ location }: LocationRiskProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Location_risk' });

  const name = getLocationName(location.key, location.name);
  const risk = getLocationRisk(location);
  const riskStyle = risk ? riskColours[risk] : undefined;
  const overflightTimes = location.overflight_time ?? [];

  return (
    <Section title={t('title', { location: name })}>
      <EmailSection className="!w-full">
        <Row className="!w-full">
          <Column className="w-1/2 p-2 pl-0 text-sm font-bold align-top">{t('risk')}</Column>
          <Column
            className="w-1/2 p-2 text-sm text-center"
            style={riskStyle && { backgroundColor: riskStyle.background, color: riskStyle.text }}
          >
            {risk ?? '-'}
          </Column>
        </Row>
        <LabelledRow label={t('probability_of_debris_impact')}>
          {formatProbability(location.fragments_probability)}
        </LabelledRow>
        <LabelledRow label={t('probability_of_reentry')}>
          {formatProbability(location.atmospheric_probability)}
        </LabelledRow>
        <LabelledRow label={t('overflight_times')}>
          {overflightTimes.length > 0
            ? overflightTimes.map((time, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={index}>
                  {dayjs.utc(time).format(FORMAT_FULL_DATE_TIME)}
                  {index !== overflightTimes.length - 1 && <br />}
                </Fragment>
              ))
            : t('no_overflights')}
        </LabelledRow>
      </EmailSection>
      {location?.map_src && <Map src={location.map_src} className="pt-4" />}
    </Section>
  );
};
