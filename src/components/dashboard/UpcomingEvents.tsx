import Api from '@/libs/Api';

type UpcomingEventsProps = {
  title: string;
  conjunctionTitle: string;
  highestPocTitle: string;
  reentryTitle: string;
  className?: string;
};

const UpcomingEvents = async ({ className, title, conjunctionTitle, reentryTitle }: UpcomingEventsProps) => {
  const conjunction = await Api.getStatsCountConjunctionEvents();
  // const highestPOC = await Api.getStatsHighestCollisionProbability();
  const reentry = await Api.getStatsCountReentryEvents();

  const items = [
    {
      title: conjunctionTitle,
      value: conjunction.data.count,
    },
    // {
    //   title: highestPocTitle,
    //   value: displayExponential(highestPOC.data.collision_probability, 3),
    // },
    {
      title: reentryTitle,
      value: reentry.data.count,
    },
  ];

  return (
    <div className={className}>
      <h2 className="govuk-heading-m mb-8">{title}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map(({ title, value }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <p className="govuk-heading-l mb-4">{value}</p>
            <p className="mb-0">{title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { UpcomingEvents };
