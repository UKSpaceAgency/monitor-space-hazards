import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { signIn } from '@/auth';
import nsocLogo from '@/public/nspoclogo2.png';
import Button from '@/ui/button/button';
import { AppConfig } from '@/utils/AppConfig';

export default function IndexPage() {
  const t = useTranslations('Index');

  return (
    <div>
      <div className="flex items-center mb-7">
        <div className="flex-1">
          <h1 className="govuk-heading-xl mb-0">{AppConfig.name}</h1>
        </div>
        <div>
          <Image src={nsocLogo} alt="National Space Operations Centre" width={180} height={81} priority />
        </div>
      </div>
      <h2 className="govuk-heading-m">{t('nsoc.title')}</h2>
      <p className="govuk-body">{t('nsoc.content')}</p>
      <p className="govuk-body">{t('nsoc.list_title')}</p>
      <ul className="govuk-list govuk-list--bullet">
        <li>{t('nsoc.list_items.track_events')}</li>
        <li>{t('nsoc.list_items.track_reentries')}</li>
        <li>{t('nsoc.list_items.satelite_history')}</li>
        <li>{t('nsoc.list_items.statistics')}</li>
      </ul>
      <h2 className="govuk-heading-m">{t('existing_users.title')}</h2>
      <form
        action={async () => {
          'use server';
          await signIn('auth0');
        }}
      >
        <Button type="submit" isStartButton aria-label={t('existing_users.button')}>{t('existing_users.button')}</Button>
      </form>
      <h2 className="govuk-heading-m">{t('new_users.title')}</h2>
      { t.rich('new_users.markup', {
        nsoc: chunks => <Link className="govuk-link" target="_blank" href="https://www.gov.uk/government/organisations/national-space-operations-centre">{chunks}</Link>,
        metoffice: chunks => <Link className="govuk-link" target="_blank" href="https://www.metoffice.gov.uk/weather/specialist-forecasts/space-weather">{chunks}</Link>,
        mailto: chunks => <a className="govuk-link" href="mailto:monitorspacehazards@ukspaceagency.gov.uk">{chunks}</a>,
      })}

    </div>
  );
}
