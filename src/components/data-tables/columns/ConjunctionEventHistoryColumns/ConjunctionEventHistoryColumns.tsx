import type { TypeEventSummaryOut } from '@/__generated__/data-contracts';
import { dayjs, FORMAT_DATE_TIME } from '@/libs/Dayjs';
import type { TranslatedColumnDef } from '@/types';
import ExpandedButton from '@/ui/button/expanded-button';
import Tag from '@/ui/tag/tag';

import styles from './eventHistoryTable.module.scss';

export const getEventHistoryColumns = (): TranslatedColumnDef<TypeEventSummaryOut>[] => [
  {
    accessorKey: 'dataSource',
    id: 'dataSource',
    header: 'Conjunction.event_history.data_source',
    cell: ({ row }) => {
      return row.getCanExpand()
        ? (
            <ExpandedButton
              isExpanded={row.getIsExpanded()}
              onClick={row.getToggleExpandedHandler()}
            >
              <span
                className={styles.button_text}
              >
                {`${row.original?.dataSource}: ID ${row.original?.cdmExternalId}`}
              </span>
              {row.original.primaryObjectCdmType
              === 'Special owner/operator ephemeris' && (
                <>
                  {' '}
                  <Tag className="govuk-!-margin-top-1">Special</Tag>
                </>
              )}
            </ExpandedButton>
          )
        : (
            `${row.original?.dataSource}: ID ${row.original?.cdmExternalId}`
          );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'updateTime',
    id: 'updateTime',
    header: 'Conjunction.event_history.time_of_update',
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return (
        <div>{dayjs(value).format(FORMAT_DATE_TIME)}</div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'collisionProbability',
    id: 'collisionProbability',
    header: 'Conjunction.event_history.probability_of_collision',
    enableSorting: false,
  },
  {
    accessorKey: 'missDistance',
    id: 'missDistance',
    header: 'Conjunction.event_history.total_miss_distance',
    enableSorting: false,
  },
  {
    accessorKey: 'radialMissDistance',
    id: 'radialMissDistance',
    header: 'Conjunction.event_history.radial_miss_distance',
    enableSorting: false,
  },
  {
    accessorKey: 'tcaTime',
    id: 'tcaTime',
    header: 'Conjunction.event_history.time_of_closest_approach',
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return (
        <div>{dayjs(value).format(FORMAT_DATE_TIME)}</div>
      );
    },
    enableSorting: false,
  },
];
