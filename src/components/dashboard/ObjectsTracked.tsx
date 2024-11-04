import Api from '@/libs/Api';

type ObjectsTrackedProps = {
  title: string;
  className?: string;
};

const ObjectsTracked = async ({ title, className }: ObjectsTrackedProps) => {
  const { data } = await Api.trackedSatellitesV1StatsObjectsTrackedGet();

  return (
    <div className={className}>
      <h2 className="govuk-heading-m pb-5 mb-8 border-b border-midGrey">{title}</h2>
      <div className="grid grid-cols-3 gap-6 md:grid-cols-5 md:gap-4">
        {data.map(({ objectType, count }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <p className="govuk-heading-l">{count}</p>
            <h4 className="govuk-heading-s mb-0">{objectType}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ObjectsTracked };
