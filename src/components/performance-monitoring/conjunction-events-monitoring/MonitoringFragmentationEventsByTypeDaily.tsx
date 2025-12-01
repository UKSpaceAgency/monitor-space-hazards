'use client';

// type DataRangeType = 'Upcoming events' | 'Last 7d' | 'Last 1 month' | 'Last 6 months';

const MonitoringFragmentationEventsByTypeDaily = () => {
  // const t = useTranslations('Charts.Events_type');

  // const params: TypeGetStatsEventsTypeParams = {
  //   start_date: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
  // };

  // const [dataRange, setDataRange] = useState<DataRangeType>('Upcoming events');
  // const [dates, setDates] = useState<{ startDate: string; endDate?: string }>({
  //   startDate: params.start_date ?? '',
  //   endDate: params.end_date ?? '',
  // });

  // const { data, isLoading } = useQuery({
  //   queryKey: [QUERY_KEYS.StatsReentryEventByType, dates],
  //   queryFn: () => getStatsFragmentationEventsType({
  //     ...params,
  //     start_date: dates.startDate,
  //     end_date: dates.endDate,
  //   }),
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  //   placeholderData: prev => prev,
  // });

  // const handleDataRangeChange = (dataRange: DataRangeType) => {
  //   setDataRange(dataRange);

  //   switch (dataRange) {
  //     case 'Last 7d':
  //       setDates({
  //         startDate: TODAY_DATE_TIME.subtract(7, 'day').format(FORMAT_API_DATE_TIME),
  //         endDate: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
  //       });
  //       break;
  //     case 'Last 1 month':
  //       setDates({
  //         startDate: TODAY_DATE_TIME.subtract(1, 'month').format(FORMAT_API_DATE_TIME),
  //         endDate: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
  //       });
  //       break;
  //     case 'Last 6 months':
  //       setDates({
  //         startDate: TODAY_DATE_TIME.subtract(6, 'month').format(FORMAT_API_DATE_TIME),
  //         endDate: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
  //       });
  //       break;
  //     case 'Upcoming events':
  //       setDates({
  //         startDate: TODAY_DATE_TIME.format(FORMAT_API_DATE_TIME),
  //       });
  //       break;
  //     default:
  //       assertUnreachable(dataRange);
  //   }
  // };

  // const actionButtons = (
  //   <ToggleButtons
  //     name="reentry-events-by-type-daily"
  //     ariaLabel="Reentry events by type"
  //     items={[
  //       {
  //         id: 'current_events',
  //         title: t('upcoming_events'),
  //         ariaLabel: 'Upcoming events',
  //         value: 'Upcoming events',
  //       },
  //       {
  //         id: 'last_7d',
  //         title: t('last_7d'),
  //         ariaLabel: 'Last 7 days',
  //         value: 'Last 7d',
  //       },
  //       {
  //         id: 'last_1_month',
  //         title: t('last_1_month'),
  //         ariaLabel: 'Last 1 month',
  //         value: 'Last 1 month',
  //       },
  //       {
  //         id: 'last_6_months',
  //         title: t('last_6_months'),
  //         ariaLabel: 'Last 6 months',
  //         value: 'Last 6 months',
  //       },
  //     ]}
  //     active={dataRange}
  //     setActive={handleDataRangeChange}
  //     title={t('data_range')}
  //   />
  // );

  // if (isLoading || !data) {
  //   return (
  //     <div className="p-10">
  //       <Spinner />
  //     </div>
  //   );
  // }

  return (
    <div>
      {/* <ReentryEventsTypeChart data={data} actionButtons={actionButtons} />
      <Scrollable>
        <DataTable
          columns={eventsByTypeDailyReentryMonitoringColumns}
          data={data}
          ariaLabel="Information on Fragmentation Events by type Daily"
        />
      </Scrollable> */}
    </div>
  );
};

export { MonitoringFragmentationEventsByTypeDaily };
