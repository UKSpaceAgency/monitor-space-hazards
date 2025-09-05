import type { AdditionalObjectRisk } from '@/actions/getConjunctionEventAdditionalRisk';
import type { TranslatedColumnDef } from '@/types';
import { rounded } from '@/utils/Math';

export const conjunctionAlertAdditionalRiskTableColumns: TranslatedColumnDef<AdditionalObjectRisk>[] = [
  {
    accessorKey: 'objectName',
    header: 'Conjunction_alert_additional_risk.object_name',
  },
  {
    accessorKey: 'currentWeeklyEvents',
    header: 'Conjunction_alert_additional_risk.current_weekly_events',
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return rounded(value, 1);
    },
  },
  {
    accessorKey: 'totalEventsFollowingWeek',
    header: 'Conjunction_alert_additional_risk.predicted_total_events',
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return rounded(value, 1);
    },
  },
  {
    accessorKey: 'additionalEventsFollowingWeek',
    header: 'Conjunction_alert_additional_risk.predicted_additional_events',
    cell: ({ getValue }) => {
      const value = getValue<number>();
      return rounded(value, 1);
    },
  },
];
