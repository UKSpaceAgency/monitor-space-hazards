import type { AdditionalObjectRisk } from '@/actions/getConjunctionEventAdditionalRisk';
import type { TranslatedColumnDef } from '@/types';

export const conjunctionAlertAdditionalRiskTableColumns: TranslatedColumnDef<AdditionalObjectRisk>[] = [
  {
    accessorKey: 'objectName',
    header: 'Conjunction_alert_additional_risk.object_name',
  },
  {
    accessorKey: 'currentWeeklyEvents',
    header: 'Conjunction_alert_additional_risk.current_weekly_events',
  },
  {
    accessorKey: 'totalEventsFollowingWeek',
    header: 'Conjunction_alert_additional_risk.predicted_total_events',
  },
  {
    accessorKey: 'additionalEventsFollowingWeek',
    header: 'Conjunction_alert_additional_risk.predicted_additional_events',
  },
];
