'use client';

import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import type { TypeThreshold, TypeThresholdType } from '@/__generated__/data-contracts';
import { patchUsersMe } from '@/actions/patchUsersMe';
import Form from '@/components/form/Form';
import { FormInput } from '@/components/form/Input';
import { TopNotificationBanner } from '@/components/TopNotificationBanner';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import Label from '@/ui/label/label';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';

import { schema } from './ThresholdsSettingsFormSchema';

type ThresholdsSettingsFormProps = {
  currentSettings?: TypeThreshold[] | null;
};

const ThresholdsSettingsForm = ({ currentSettings }: ThresholdsSettingsFormProps) => {
  const t = useTranslations('Forms.Thresholds_settings');
  const tCommon = useTranslations('Common');

  const { mutate, isSuccess, isError, isPending } = useMutation({
    mutationFn: async (values: TypeThreshold[]) => {
      await patchUsersMe({ notification_thresholds: values });
    },
  });

  const defaultValues = useMemo(() => currentSettings?.reduce((acc, cur) => {
    if (cur.type === 'TIME_TO_EVENT') {
      acc[cur.type] = cur.value / 3600;
    } else if (cur.type === 'PROBABILITY_OF_COLLISION') {
      acc[cur.type] = cur.value * 100;
    } else {
      acc[cur.type] = cur.value;
    }
    return acc;
  }, {} as Record<TypeThresholdType, number>), [currentSettings]);

  const handleFormSubmit = async (values: Record<TypeThresholdType, number>) => {
    const notificationThresholds: TypeThreshold[] = [];
    for (const [key, fieldValue] of Object.entries(values)) {
      let value = 0;
      if (key === 'TIME_TO_EVENT') {
        value = fieldValue * 3600;
      } else if (key === 'PROBABILITY_OF_COLLISION') {
        value = fieldValue / 100;
      } else {
        value = fieldValue;
      }
      notificationThresholds.push({
        type: key as TypeThresholdType,
        value,
      });
    }
    mutate(notificationThresholds);
  };

  return (
    <div>
      {isSuccess && <TopNotificationBanner status="success">{t('success_message')}</TopNotificationBanner>}
      {isError && <TopNotificationBanner status="error">{t('error_message')}</TopNotificationBanner>}
      <Form
        action={handleFormSubmit}
        defaultValues={defaultValues}
        schema={schema}
        i18path="Thresholds_settings"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCellHeader>{t('notification_criteria')}</TableCellHeader>
              <TableCellHeader>{t('threshold')}</TableCellHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="align-center"><Label className="font-bold mb-0" htmlFor="poc_field">{t('PROBABILITY_OF_COLLISION')}</Label></TableCell>
              <TableCell><FormInput id="poc_field" name="PROBABILITY_OF_COLLISION" className="mb-0" type="number" suffix="%" step={0.001} /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="align-center"><Label className="font-bold mb-0" htmlFor="total_miss_distance">{t('TOTAL_MISS_DISTANCE')}</Label></TableCell>
              <TableCell><FormInput id="total_miss_distance" name="TOTAL_MISS_DISTANCE" className="mb-0" type="number" suffix="m" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="align-center"><Label className="font-bold mb-0" htmlFor="total_radial_distance">{t('MEAN_RADIAL_MISS_DISTANCE')}</Label></TableCell>
              <TableCell><FormInput id="total_radial_distance" name="MEAN_RADIAL_MISS_DISTANCE" className="mb-0" type="number" suffix="m" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="align-center"><Label className="font-bold mb-0" htmlFor="time_to_conjunction">{t('TIME_TO_EVENT')}</Label></TableCell>
              <TableCell><FormInput id="time_to_conjunction" name="TIME_TO_EVENT" className="mb-0" type="number" suffix="hours" /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <ButtonGroup>
          <Button type="submit" disabled={isPending}>{tCommon('save_and_continue')}</Button>
          <Link href="/account">
            <Button variant="secondary">{tCommon('return', { to: 'Account' })}</Button>
          </Link>
        </ButtonGroup>
      </Form>
    </div>
  );
};

export { ThresholdsSettingsForm };
