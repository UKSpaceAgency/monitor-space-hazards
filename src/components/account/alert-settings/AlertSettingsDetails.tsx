'use client';

import { useTranslations } from 'next-intl';

import Details from '@/ui/details/details';

const AlertSettingsDetails = () => {
  const t = useTranslations('Forms.Alert_settings');

  return (
    <Details summary={t('help.title')}>
      <p>{t('help.priority_conjunction')}</p>
      <ul className="govuk-list--bullet">
        <li>{t('help.more_than_5')}</li>
        <li>{t('help.or_significant')}</li>
        <li>{t('help.or_for_uk')}</li>
        <ul className="govuk-list--bullet">
          <li>{t('help.more_than_1')}</li>
          <li>{t('help.and_no_manoeuvre')}</li>
        </ul>
        <li>{t('help.or_for_non_uk')}</li>
        <ul className="govuk-list--bullet">
          <li>{t('help.medium_or_higher')}</li>
          <li>{t('help.and_no_manoeuvre')}</li>
        </ul>
      </ul>
    </Details>
  );
};

export { AlertSettingsDetails };
