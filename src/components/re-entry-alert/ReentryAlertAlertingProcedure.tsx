import { useTranslations } from 'next-intl';

type ReentryAlertAlertingProcedureProps = {
  dataPdf?: string;
};

const ReentryAlertAlertingProcedure = ({ dataPdf }: ReentryAlertAlertingProcedureProps) => {
  const t = useTranslations('Reentry_alert.Alerting_procedure');
  return (
    <div data-pdf={dataPdf}>
      {t.rich('content')}
    </div>
  );
};

export { ReentryAlertAlertingProcedure };
