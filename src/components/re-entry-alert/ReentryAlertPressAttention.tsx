import { Markdown } from '../Markdown';

type ReentryAlertPressAttentionProps = {
  comment: string;
  dataPdf?: string;
};

const ReentryAlertPressAttention = ({ comment, dataPdf }: ReentryAlertPressAttentionProps) => {
  return (
    <div data-pdf={dataPdf}>
      <Markdown>{comment}</Markdown>
    </div>
  );
};

export { ReentryAlertPressAttention };
