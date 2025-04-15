'use server';

export type AdditionalObjectRisk = {
  objectName: string;
  currentWeeklyEvents: number;
  totalEventsFollowingWeek: number;
  additionalEventsFollowingWeek: number;
};

type ReportResponseData = {
  additional_object_risk: AdditionalObjectRisk[];
};

export async function getConjunctionEventAdditionalRisk(presignedUrl: string) {
  try {
    const data = await fetch(presignedUrl);
    const reports: ReportResponseData[] = await data.json();
    const lastReport = reports[0];

    if (!lastReport) {
      throw new Error('No reports found');
    }

    return lastReport.additional_object_risk;
  } catch (error) {
    console.error(error);
    return [];
  }
}
