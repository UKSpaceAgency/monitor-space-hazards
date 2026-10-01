import { Markdown } from '../Markdown';

type ReentryAlertLiabilityForDamagesProps = {
  comment: string;
  dataPdf?: string;
};

const ReentryAlertLiabilityForDamages = ({ comment, dataPdf }: ReentryAlertLiabilityForDamagesProps) => {
  return (
    <div data-pdf={dataPdf}>
      <Markdown>{comment}</Markdown>
    </div>
  );
};

export { ReentryAlertLiabilityForDamages };
