import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { postUsersMeClientCredentials } from '@/actions/postUsersMeClientCredentials';
import Button from '@/ui/button/button';
import Panel from '@/ui/panel/panel';

export const metadata: Metadata = {
  title: 'Credentials for API authentication',
};

export default async function Credentials() {
  const t = await getTranslations('Credentials');
  const credentials = await postUsersMeClientCredentials();

  return (
    <Panel heading={t('title')}>
      <div className="m-9">
        <p>
          {t('client_id')}
          <br />
          <strong>{credentials.client_id}</strong>
        </p>
      </div>
      <Button
        className="govuk-button--secondary"
      >
        {t('copy_client_id_button')}
      </Button>
      <div className="m-9">
        <p>
          {t('client_secret')}
          <br />
          <strong style={{ lineBreak: 'anywhere' }}>
            {credentials.client_secret}
          </strong>
        </p>
      </div>
      <Button
        className="govuk-button--secondary"
      >
        {t('copy_client_secret_button')}
      </Button>
    </Panel>
  );
}
