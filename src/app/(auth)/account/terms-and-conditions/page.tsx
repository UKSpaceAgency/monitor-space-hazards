/* eslint-disable react/no-nested-components */
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getUsersMe } from '@/actions/getUsersMe';
import { patchUsersMe } from '@/actions/patchUsersMe';
import { HtmlMapper } from '@/components/HtmlMapper';
import { TermsAndConditionsForm } from '@/components/terms-and-conditions/TermsAndConditionsForm';
import { getPage } from '@/libs/Cms';
import Button from '@/ui/button/button';

export const metadata: Metadata = {
  title: 'View Terms and Conditions',
};

export default async function TermsAndConditions() {
  const t = await getTranslations('TermsAndConditions');
  const { content } = await getPage('terms-and-conditions');
  const data = await getUsersMe();

  const submitForm = async () => {
    'use server';

    await patchUsersMe({
      toc_accepted_at: new Date().toJSON(),
    });
  };

  const Download = () => (
    <>
      <hr />
      <p className="govuk-body">{t('accepted_text')}</p>
      <a href="/Monitor Space Hazards Terms and Conditions.pdf" download>
        <Button element="button">{t('button')}</Button>
      </a>
    </>
  );

  return (
    <>
      <h1 className="govuk-heading-xl">{t('title')}</h1>
      <HtmlMapper content={content} />
      {data.toc_accepted_at
        ? <Download />
        : (
            <TermsAndConditionsForm
              onSubmit={submitForm}
            />
          )}
    </>
  );
}
