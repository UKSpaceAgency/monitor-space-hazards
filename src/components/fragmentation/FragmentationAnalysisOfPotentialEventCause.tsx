import type { TypeFragmentationReportOut } from '@/__generated__/data-contracts';

type FragmentationAnalysisOfPotentialEventCauseProps = {
  report: TypeFragmentationReportOut;
};

// eslint-disable-next-line unused-imports/no-unused-vars
const FragmentationAnalysisOfPotentialEventCause = ({ report }: FragmentationAnalysisOfPotentialEventCauseProps) => {
  return (
    <div>
      <p className="govuk-body">At present, the UK Space Agency believes the most likely cause of this event to be a collision between RESURS P1 and METEOR 1-11.</p>
      <p className="govuk-body">Hold for commentary on the collision provided by orbital analysts through API.</p>
    </div>
  );
};

export { FragmentationAnalysisOfPotentialEventCause };
