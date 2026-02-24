import type { AdditionalObjectRisk } from '@/actions/getConjunctionEventAdditionalRisk';
import type { TranslatedColumnDef } from '@/types';
import { rounded } from '@/utils/Math';

export const conjunctionAlertAdditionalRiskTableColumns: TranslatedColumnDef<AdditionalObjectRisk>[] = [
  {
    accessorKey: 'object_name',
    header: 'Conjunction_alert_additional_risk.object_name',
  },
  {
    accessorKey: 'current_weekly_events',
    header: 'Conjunction_alert_additional_risk.current_weekly_events',
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return value ? rounded(value, 1) : '-';
    },
  },
  {
    accessorKey: 'total_events_following_week',
    header: 'Conjunction_alert_additional_risk.predicted_total_events',
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return value ? rounded(value, 1) : '-';
    },
  },
  {
    accessorKey: 'additional_events_following_week',
    header: 'Conjunction_alert_additional_risk.predicted_additional_events',
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return value ? rounded(value, 1) : '-';
    },
  },
];
