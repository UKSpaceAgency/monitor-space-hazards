'use server';

export type ScreeningResults = {
  norad_id: string;
  object_name: string;
  mass: number | null;
  current_tally: number;
  fragments_tally: number;
  apogee: number;
  perigee: number;
  inclination: number;
};

type ReportResponseData = {
  screening_results: ScreeningResults[];
};

export async function getFragmentationEventScreeningResults(presigned_url: string) {
  const data = await fetch(presigned_url);
  const reports: ReportResponseData[] = await data.json();
  const lastReport = reports[0];

  if (!lastReport || !lastReport.screening_results || lastReport.screening_results.length === 0) {
    // Return mock data when no reports found or empty results
    return [];
  }

  return lastReport.screening_results;
}
