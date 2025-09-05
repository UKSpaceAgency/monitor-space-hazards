'use client';

import { useTranslations } from 'next-intl';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import Input from '@/ui/input/input';
import Label from '@/ui/label/label';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';
import type { ThresholdsSettingsFormSchema } from '@/validations/thresholdsSettingsFormSchema';

type ThresholdsSettingsFormContentProps = {
  isSubmitting: boolean;
  register: UseFormRegister<ThresholdsSettingsFormSchema>;
  errors: FieldErrors<ThresholdsSettingsFormSchema>;
};

const ThresholdsSettingsFormContent = ({ isSubmitting, register, errors }: ThresholdsSettingsFormContentProps) => {
  const t = useTranslations('Forms.Thresholds_settings');
  const tCommon = useTranslations('Common');

  return (
    <div>
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
            <TableCell><Input id="poc_field" {...register('PROBABILITY_OF_COLLISION', { valueAsNumber: true })} required className="mb-0" type="number" suffix="%" step={0.0000001} error={errors.PROBABILITY_OF_COLLISION?.message} aria-label={t('PROBABILITY_OF_COLLISION')} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="align-center"><Label className="font-bold mb-0" htmlFor="total_miss_distance">{t('TOTAL_MISS_DISTANCE')}</Label></TableCell>
            <TableCell><Input id="total_miss_distance" {...register('TOTAL_MISS_DISTANCE', { valueAsNumber: true })} required className="mb-0" type="number" suffix="m" error={errors.TOTAL_MISS_DISTANCE?.message} aria-label={t('TOTAL_MISS_DISTANCE')} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="align-center"><Label className="font-bold mb-0" htmlFor="total_radial_distance">{t('MEAN_RADIAL_MISS_DISTANCE')}</Label></TableCell>
            <TableCell><Input id="total_radial_distance" {...register('MEAN_RADIAL_MISS_DISTANCE', { valueAsNumber: true })} required className="mb-0" type="number" suffix="m" error={errors.MEAN_RADIAL_MISS_DISTANCE?.message} aria-label={t('MEAN_RADIAL_MISS_DISTANCE')} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="align-center"><Label className="font-bold mb-0" htmlFor="time_to_conjunction">{t('TIME_TO_EVENT')}</Label></TableCell>
            <TableCell><Input id="time_to_conjunction" {...register('TIME_TO_EVENT', { valueAsNumber: true })} required className="mb-0" type="number" suffix="hours" error={errors.TIME_TO_EVENT?.message} aria-label={t('TIME_TO_EVENT')} /></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <ButtonGroup>
        <Button type="submit" disabled={isSubmitting}>{tCommon('save_and_continue')}</Button>
        <Button as="link" href="/account" variant="secondary">{tCommon('return', { to: 'Account' })}</Button>
      </ButtonGroup>
    </div>
  );
};

export { ThresholdsSettingsFormContent };
