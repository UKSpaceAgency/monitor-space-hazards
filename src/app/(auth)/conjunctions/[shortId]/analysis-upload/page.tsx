import { getTranslations } from 'next-intl/server';

import { ConjunctionAnalysisUploadForm } from '@/components/conjunction/forms/ConjunctionAnalysisUploadForm';
import Details from '@/ui/details/details';

export const metadata = {
  title: 'Upload your conjunction data',
};

export default async function ConjunctionAnalysisUpload({
  params,
}: {
  params: Promise<{ shortId: string }>;
}) {
  const t = await getTranslations('ConjunctionAnalysisUploadPage');
  const { shortId } = await params;

  return (
    <div>
      <h1 className="govuk-heading-xl">{t('title', { shortId })}</h1>
      <p className="govuk-body">{t('content')}</p>
      <ConjunctionAnalysisUploadForm objectId={shortId} />
      <Details summary={t('help.title')}>
        {t.rich('help.content')}
        <pre>
          {JSON.stringify(
            {
              event_id: '',
              cdm_id: '',
              collision_probability: '',
              tca: '',
              miss_distance: {
                total_value: '',
                total_uncertainty: '',
                mean_radial_value: '',
                mean_radial_uncertainty: '',
                in_track_value: '',
                in_track_uncertainty: '',
                cross_track_value: '',
                cross_track_uncertainty: '',
              },
              update_time: '',
              altitude: '',
              latitude: '',
              longitude: '',
              relative_velocity: '',
              estimated_combined_mass: '',
              estimated_fragments: '',
              primary_object: {
                norad_id: '',
                data_received: '',
                data_source: '',
                HBR: '',
                observations_number: '',
                observations_available: '',
                observations_timespan: '',
                OD_Quality: '',
              },
              secondary_object: {
                norad_id: '',
                data_received: '',
                data_source: '',
                HBR: '',
                observations_number: '',
                observations_available: '',
                observations_timespan: '',
                OD_Quality: '',
              },
              collision_probability_method: '',
            },
            null,
            2,
          )}
        </pre>
      </Details>
    </div>
  );
};

export { ConjunctionAnalysisUpload };
