'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useFormState } from 'react-hook-form';

import { FormInput } from '@/components/form/FormInput';
import Button from '@/ui/button/button';
import ButtonGroup from '@/ui/button-group/button-group';
import Label from '@/ui/label/label';
import { Table, TableBody, TableCell, TableCellHeader, TableHead, TableRow } from '@/ui/table/Table';

const ThresholdsSettingsFormContent = () => {
  const t = useTranslations('Forms.Thresholds_settings');
  const tCommon = useTranslations('Common');
  const { isSubmitting } = useFormState();

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
        <Button type="submit" disabled={isSubmitting}>{tCommon('save_and_continue')}</Button>
        <Link href="/account">
          <Button variant="secondary">{tCommon('return', { to: 'Account' })}</Button>
        </Link>
      </ButtonGroup>
    </div>
  );
};

export { ThresholdsSettingsFormContent };
