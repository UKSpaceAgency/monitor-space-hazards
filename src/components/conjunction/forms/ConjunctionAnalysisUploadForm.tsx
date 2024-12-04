'use client';

import { useTranslations } from 'next-intl';
import { useFormState, useFormStatus } from 'react-dom';

import { postAnalyses } from '@/actions/postAnalyses';
import Button from '@/ui/button/button';
import ErrorSummary from '@/ui/error-summary/error-summary';
import FieldUpload from '@/ui/field-upload/field-upload';

type ConjunctionAnalysisUploadFormProps = {
  objectId: string;
};

const ConjunctionAnalysisUploadForm = ({ objectId }: ConjunctionAnalysisUploadFormProps) => {
  const t = useTranslations('Forms.AnalysisUpload');
  const [state, formAction] = useFormState(postAnalyses, null);
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

export { ConjunctionAnalysisUploadForm };
