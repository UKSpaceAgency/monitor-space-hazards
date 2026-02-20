import type { TypeEventSummaryOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import ExpandedButton from '@/ui/button/expanded-button';
import Tag from '@/ui/tag/tag';
import { displayExponential, getAbsoluteValue } from '@/utils/Math';

export const conjunctionEventHistoryColumns: TranslatedColumnDef<TypeEventSummaryOut>[] = [
  {
    accessorKey: 'data_source',
    id: 'data_source',
    header: 'Conjunction.event_history.data_source',
    cell: ({ row }) => {
      return row.getCanExpand()
        ? (
            <ExpandedButton
              isExpanded={row.getIsExpanded()}
              onClick={row.getToggleExpandedHandler()}
            >
              <span>
                {`${row.original?.data_source}: ID ${row.original?.cdm_external_id}`}
              </span>
              {row.original.primary_object_cdm_type
              === 'Special owner/operator ephemeris' && (
                <>
                  {' '}
                  <Tag className="govuk-!-margin-top-1">Special</Tag>
                </>
              )}
            </ExpandedButton>
          )
        : (
            `${row.original?.data_source}: ID ${row.original?.cdm_external_id}`
          );
    },
  },
  {
    accessorKey: 'update_time',
    id: 'update_time',
    header: 'Conjunction.event_history.time_of_update',
    cell: ({ getValue }) => {
      const value = getValue<string>();
      return (
        <div>{dayjs(value).format(FORMAT_DATE_TIME)}</div>
      );
    },
  },
  {
    accessorKey: 'collision_probability',
    id: 'collision_probability',
    header: 'Conjunction.event_history.probability_of_collision',
    cell: ({ getValue }) => {
      const value = getValue<number | null>();
      return displayExponential(value, 4);
    },
  },
  {
    accessorKey: 'miss_distance',
    id: 'miss_distance',
    header: 'Conjunction.event_history.total_miss_distance',
  },
  {
    accessorKey: 'radial_miss_distance',
    id: 'radial_miss_distance',
    header: 'Conjunction.event_history.radial_miss_distance',
    cell: ({ getValue }) => {
      const value = getValue<number>();

      return getAbsoluteValue(value);
    },
  },
  {
    accessorKey: 'tca_time',
    id: 'tca_time',
    header: 'Conjunction.event_history.time_of_closest_approach',
    cell: ({ getValue }) => {
      const value = getValue<string>();

      return dayjs(value).format(FORMAT_DATE_TIME);
    },
  },
];
