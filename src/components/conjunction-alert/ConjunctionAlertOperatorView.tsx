import Link from 'next/link';
import { useTranslations } from 'next-intl';

const ConjunctionAlertOperatorView = ({ shortId }: { shortId: string }) => {
  const t = useTranslations('Conjunction_alert.Operator_view');

  return (
    <div>
      {t.rich('content', {
        link: chunks => <Link className="govuk-link" href={`/conjunctions/${shortId}`}>{chunks}</Link>,
      })}
    </div>
  );
};

export { ConjunctionAlertOperatorView };
