'use client';

import { useTranslations } from 'next-intl';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { postEphemeris } from '@/actions/postEphemeris';
import Button from '@/ui/button/button';
import ErrorSummary from '@/ui/error-summary/error-summary';
import FieldUpload from '@/ui/field-upload/field-upload';

type SatelliteEphemerisUploadFormProps = {
  objectId: string;
};

const SatelliteEphemerisUploadForm = ({ objectId }: SatelliteEphemerisUploadFormProps) => {
  const t = useTranslations('Forms.Ephemeris_upload');
  const [state, formAction] = useActionState(postEphemeris, null);
  const { pending } = useFormStatus();

  return (
    <div>
      {state?.error && (
        <ErrorSummary
          errorList={[
            {
              href: `#upload-file`,
              children: state.error,
            },
          ]}
        />
      )}
      <form action={formAction}>
        <input type="hidden" name="object_id" value={objectId} />
        <FieldUpload name="file" label={t('label')} required />
        <Button type="submit" disabled={pending}>{t('button')}</Button>
      </form>
    </div>

  );
};

export { SatelliteEphemerisUploadForm };
