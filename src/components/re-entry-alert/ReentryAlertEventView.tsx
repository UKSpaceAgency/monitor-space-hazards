import Link from 'next/link';
import { useTranslations } from 'next-intl';

type ReentryAlertEventViewProps = {
  shortId: string;
};

const ReentryAlertEventView = ({ shortId }: ReentryAlertEventViewProps) => {
  const t = useTranslations('Reentry_alert.Event_view');
  return (
    <div>
      {t.rich('content', {
        link: chunk => <Link className="govuk-link" href={`/re-entries/${shortId}`}>{chunk}</Link>,
      })}
    </div>
  );
};

export { ReentryAlertEventView };
