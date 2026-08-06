'use client';

import { isNumber } from 'lodash';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import type {
  TypeOverflightProbability,
  TypeReentryEventOut,
  TypeReentryEventReportOut,
  TypeRisk,
} from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Details from '@/ui/details/details';
import {
  Table,
  TableBody,
  TableCell,
  TableCellHeader,
  TableHead,
  TableRow,
} from '@/ui/table/Table';
import { roundedPercent } from '@/utils/Math';
import { jsonRegionsMap } from '@/utils/Regions';
import { renderRiskTag } from '@/utils/Tags';

type EventSummaryData = Pick<
  TypeReentryEventOut,
  | 'fragments_probability'
  | 'fragments_risk'
  | 'atmospheric_probability'
  | 'atmospheric_risk'
  | 'human_casualty_probability'
  | 'human_casualty_risk'
  | 'object_name'
>;

type ReentryAlertExecutiveSummaryTableProps = {
  event: EventSummaryData;
  report: TypeReentryEventReportOut;
};

type LocationAtRisk = TypeOverflightProbability & {
  region: string;
  location: string;
};

const RISK_SEVERITY: Record<string, number> = {
  'None': 0,
  'Pending': 0,
  'Very low': 1,
  'Low': 2,
  'Medium': 3,
  'High': 4,
};

const formatProbability = (value: number | null | undefined): string => {
  return isNumber(value) ? roundedPercent(value) : '-';
};

const formatOverflightTime = (
  overflightTime: string[] | null | undefined,
  index: number,
): string => {
  return overflightTime?.[index]
    ? dayjs(overflightTime[index]).format(FORMAT_DATE_TIME)
    : '-';
};

const getLocationDisplayName = (key: string): string => {
  return jsonRegionsMap[key] ?? key;
};

const getLocationRisk = (data: TypeOverflightProbability): TypeRisk | null => {
  const risks = [
    data.fragments_risk,
    data.atmospheric_risk,
    data.human_casualty_risk,
  ].filter((risk): risk is TypeRisk => Boolean(risk));

  if (risks.length === 0) {
    return null;
  }

  return risks.reduce((highest, risk) =>
    (RISK_SEVERITY[risk] ?? 0) > (RISK_SEVERITY[highest] ?? 0) ? risk : highest,
  );
};

const ReentryAlertRiskProbabilitiesTable = ({
  report,
}: ReentryAlertExecutiveSummaryTableProps) => {
  const t = useTranslations('Tables.Reentry_alert_locations_at_risk');

  const locationsAtRisk = useMemo(() => {
    if (!report.impact) {
      return [];
    }

    return (
      Object.entries(report.impact) as [
        string,
        Record<string, TypeOverflightProbability>,
      ][]
    ).flatMap(([region, regionData]) =>
      Object.entries(regionData)
        .filter(([, data]) => {
          const probabilities = [
            data.fragments_probability,
            data.atmospheric_probability,
            data.human_casualty_probability,
          ];
          return probabilities.some(
            probability => isNumber(probability) && probability > 0.0001,
          );
        })
        .map(
          ([location, data]): LocationAtRisk => ({
            region,
            location,
            ...data,
          }),
        ),
    );
  }, [report.impact]);

  const maxOverflightCount = useMemo(() => {
    return locationsAtRisk.reduce((maxCount, location) => {
      return Math.max(maxCount, location.overflight_time?.length ?? 0);
    }, 0);
  }, [locationsAtRisk]);

  return (
    <div>
      {locationsAtRisk.length === 0
        ? (
            <p className="govuk-body">{t('empty')}</p>
          )
        : (
            <div className="w-full overflow-x-auto">
              <Table className="text-base">
                <TableHead>
                  <TableRow>
                    <TableCellHeader>{t('location')}</TableCellHeader>
                    <TableCellHeader>{t('risk_to_location')}</TableCellHeader>
                    <TableCellHeader>
                      {t('probability_of_debris_impact')}
                    </TableCellHeader>
                    <TableCellHeader>{t('probability_of_reentry')}</TableCellHeader>
                    <TableCellHeader>
                      {t('probability_of_human_casualties')}
                    </TableCellHeader>
                    {Array.from({ length: maxOverflightCount }, (_, index) => (
                      <TableCellHeader key={`overflight-header-${index}`}>
                        {t('time_of_overflight', { number: index + 1 })}
                      </TableCellHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {locationsAtRisk.map(locationAtRisk => (
                    <TableRow
                      key={`${locationAtRisk.region}-${locationAtRisk.location}`}
                    >
                      <TableCellHeader>
                        {getLocationDisplayName(locationAtRisk.location)}
                      </TableCellHeader>
                      <TableCell>
                        {renderRiskTag(getLocationRisk(locationAtRisk))}
                      </TableCell>
                      <TableCell>
                        {formatProbability(locationAtRisk.fragments_probability)}
                      </TableCell>
                      <TableCell>
                        {formatProbability(locationAtRisk.atmospheric_probability)}
                      </TableCell>
                      <TableCell>
                        {formatProbability(
                          locationAtRisk.human_casualty_probability,
                        )}
                      </TableCell>
                      {Array.from({ length: maxOverflightCount }, (_, index) => (
                        <TableCell
                          key={`${locationAtRisk.location}-overflight-${index}`}
                        >
                          {formatOverflightTime(
                            locationAtRisk.overflight_time,
                            index,
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
      <Details summary={t.rich('help.title')}>{t.rich('help.content')}</Details>
    </div>
  );
};

export { ReentryAlertRiskProbabilitiesTable };
