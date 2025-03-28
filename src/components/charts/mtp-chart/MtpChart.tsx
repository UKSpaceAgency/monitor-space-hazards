'use client';
import { groupBy } from 'lodash';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import type { ManoeuvrePlot, ManoeuvrePlotPoint } from '@/actions/getManoeuvrePlot';
import { DownloadData } from '@/components/DownloadData';
import RichText from '@/components/RichText';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import Details from '@/ui/details/details';
import Select from '@/ui/select/select';
import ToggleButtons from '@/ui/toggle-buttons/toggle-buttons';
import { displayExponential } from '@/utils/Math';

import BaseScatter from '../base-scatter/BaseScatter';
import { generateBichromaticOptions } from './generateBichromaticOptions';
import type { TooltipCallbackModel } from './generateLabelColorCallbackFunction';
import { getMtpChartDatasets } from './getMtpChartDatasets';
import { getMtpChartTooltipConfig } from './getMtpChartTooltipConfig';

type MtpChartProps = {
  manoeuvrePlot: ManoeuvrePlot;
  dataPdf?: string;
};

export function MtpChart({
  manoeuvrePlot,
  dataPdf,
}: MtpChartProps) {
  const t = useTranslations('Charts.Mtp_chart');

  const { data, cdm_external_id, tca_time } = manoeuvrePlot;

  const [dataSource, setDataSource] = useState<keyof ManoeuvrePlotPoint>('UKSA_collision_probability');
  const [selectedThreshold, setSelectedThreshold] = useState(1e-5);

  const dataGrouped = useMemo(() => groupBy(data, 'burn_datetime'), [data]);
  const keys = useMemo(() => Object.keys(dataGrouped), [dataGrouped]);

  const thresholdOptions = useMemo(
    () =>
      [1e-3, 1e-4, 1e-5, 1e-6, 1e-7, 1e-8, 1e-9, 1e-10, 1e-11].map(
        thresh => ({
          children: displayExponential(thresh, 0),
          value: displayExponential(thresh, 0),
        }),
      ),
    [],
  );

  const onThresholdSelectChange = useCallback(
    ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedThreshold(Number(target.value));
    },
    [setSelectedThreshold],
  );

  const options = useMemo(
    () => generateBichromaticOptions(selectedThreshold),
    [selectedThreshold],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callbackLabel = ({ raw }: TooltipCallbackModel) => {
    let poc_label = t('chart.poc');
    if (raw.prob !== null) {
      poc_label += displayExponential(raw.prob, 4);
    }
    let dv_label = t('chart.delta_v');
    if (raw.y !== null) {
      dv_label += raw.y;
      dv_label += 'cm/s';
    }
    let orbit_label = t('chart.orbit_label');
    if (raw.x !== null) {
      orbit_label += raw.orbit;
    }
    let datetime_label = t('chart.date_and_time');
    if (raw.x !== null) {
      datetime_label += dayjs(raw.burn_datetime).format(FORMAT_DATE_TIME);
    }
    return [poc_label, dv_label, orbit_label, datetime_label];
  };

  const tooltipConfig = useMemo(() => getMtpChartTooltipConfig({ options, callbackLabel }), [callbackLabel, options]);
  const datasets = useMemo(() => getMtpChartDatasets({
    data,
    dataSource,
    dataGrouped,
    options,
    keys,
    tca_time,
  }), [data, dataGrouped, dataSource, keys, options, tca_time]);

  return (
    <>
      <div id="mtp-content" className="mb-4" data-pdf={dataPdf}>
        <p className="govuk-body">
          {t('description')}
        </p>
        <div className="p-4 mb-4 bg-lightGrey">
          <div className="mb-4 lg:flex lg:items-center lg:gap-4" data-pdf-ignore>
            <div>
              <h3 className="govuk-heading-s govuk-!-margin-bottom-1">
                {t('chart.header')}
              </h3>
              <RichText>
                {tags => t.rich('chart.content', tags) }
              </RichText>
            </div>
            <Select
              name="PoC select"
              aria-label="PoC select"
              value={displayExponential(selectedThreshold, 0)}
              options={thresholdOptions}
              onChange={onThresholdSelectChange}
            />
          </div>
          <div className="lg:flex lg:items-center lg:justify-end" data-pdf-ignore>
            <ToggleButtons
              name="mtp-source-toggle"
              title={t('chart.buttons.title')}
              items={[
                {
                  title: t('chart.buttons.space-track'),
                  value: 'ST_collision_probability',
                },
                {
                  title: t('chart.buttons.uksa'),
                  value: 'UKSA_collision_probability',
                },
              ]}
              active={dataSource}
              setActive={setDataSource}
            />
          </div>
          <div className="govuk-!-text-align-right" data-pdf-ignore>
            <p className="govuk-heading-s govuk-!-margin-right-7">
              {t('chart.cdm_source')}
              {cdm_external_id}
            </p>
          </div>
          <BaseScatter
            data={datasets as any}
            xAxisTitle={t('chart.x_axis_title')}
            yAxisTitle={t('chart.y_axis_title')}
            tooltipConfig={tooltipConfig}
            referenceLineValue={tca_time}
            referenceLineTitle={t('chart.tca')}
            legend={{ title: t('chart.legend_title') }}
            min={keys[keys.length - 1]}
          />
        </div>
        <DownloadData type={t('download')} params={{}} downloadAction={async () => data} data-pdf-ignore />
      </div>
      <Details summary={t('details.summary')} data-pdf-ignore>
        <RichText>
          {tags => t.rich('details.content', tags) }
        </RichText>
      </Details>
    </>
  );
}

export default MtpChart;
