import { isNumber } from 'lodash';

import type { TypeReentryEventOut, TypeReentryEventReportOut } from '@/__generated__/data-contracts';
import type { ReentryLocationAtRisk } from '@/emails/_utils/reentry-locations';
import { getLocationsAtRisk } from '@/emails/_utils/reentry-locations';
import { createEmailTranslator } from '@/emails/_utils/utils';
import { dayjs, FORMAT_FULL_DATE_TIME } from '@/libs/Dayjs';

import { Section } from '../section';
import { Table } from '../table';
import { LocationRisk } from './location-risk';

type ReentryLocationsAtRiskProps = {
  locations: ReentryLocationAtRisk[];
  event: TypeReentryEventOut;
  report: TypeReentryEventReportOut;
};

const UNKNOWN = 'Unknown';

export const ReentryLocationsAtRisk = ({ locations, event, report }: ReentryLocationsAtRiskProps) => {
  const t = createEmailTranslator({ namespace: 'Emails.Reentry_alert.Location_risk' });

  const locationsAtRisk = getLocationsAtRisk(locations);

  if (locationsAtRisk.length === 0) {
    const decayEpoch = report.decay_epoch ?? event.decay_epoch;
    const uncertaintyWindow = report.uncertainty_window ?? event.uncertainty_window;

    return (
      <Section title={t('below_threshold')}>
        <Table
          forceAlignLeft
          data={[
            [
              t('predicted_re_entry_time'),
              decayEpoch ? dayjs.utc(decayEpoch).format(FORMAT_FULL_DATE_TIME) : UNKNOWN,
            ],
            [
              t('uncertainty_window'),
              isNumber(uncertaintyWindow) ? `+/- ${uncertaintyWindow} ${t('minutes')}` : UNKNOWN,
            ],
          ]}
        />
      </Section>
    );
  }

  return (
    <>
      {locationsAtRisk.map(location => (
        <LocationRisk key={location.key} location={location} />
      ))}
    </>
  );
};
