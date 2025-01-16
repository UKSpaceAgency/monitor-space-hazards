import Api from '@/libs/Api';
import { displayExponential } from '@/utils/Math';

type UpcomingEventsProps = {
  title: string;
  conjunctionTitle: string;
  highestPocTitle: string;
  reentryTitle: string;
  className?: string;
};

const UpcomingEvents = async ({ className, title, conjunctionTitle, highestPocTitle, reentryTitle }: UpcomingEventsProps) => {
  const conjunction = await Api.getStatsCountConjunctionEvents();
  const highestPOC = await Api.getStatsHighestCollisionProbability();
  const reentry = await Api.getStatsCountReentryReports();

  const items = [
    {
      title: conjunctionTitle,
      value: conjunction.data.count,
    },
    {
      title: highestPocTitle,
      value: displayExponential(highestPOC.data.collisionProbability, 3),
    },
    {
      title: reentryTitle,
      value: reentry.data.count,
    },
  ];

  return (
    <div className={className}>
      <h2 className="govuk-heading-m pb-5 mb-8 border-b border-midGrey">{title}</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map(({ title, value }, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <h4 className="govuk-heading-s pb-5 mb-8 border-b border-midGrey">{title}</h4>
            <p className="govuk-heading-l mb-0">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { UpcomingEvents };
