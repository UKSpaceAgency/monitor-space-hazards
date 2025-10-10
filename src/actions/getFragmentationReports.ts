'use server';

import { sortBy } from 'lodash';

import type { TypeFragmentationReport, TypeGetFragmentationReportsFragmentationEventShortIdParams } from '@/__generated__/data-contracts';
import Api from '@/libs/Api';

const mockFragmentationReports: TypeFragmentationReport[] = [
  {
    id: 'mock-report-1',
    short_id: 'FRAG-MOCK-001',
    report_number: 1,
    event_epoch: new Date().toISOString(),
    modelled_fragments: 15,
    known_fragments: 8,
    fragmentation_type_comment: 'Mock fragmentation analysis report',
    fragmentation_type: 'Collision',
    affected_regime: 'LEO',
    conjunction_event_id: null,
    conjunction_commentary: 'Mock conjunction commentary for fragmentation report',
    object_history: 'Mock object history for fragmentation analysis',
    risk: 'Medium',
    primary_object_common_name: 'MOCK SATELLITE',
    primary_object_norad_id: '12345',
    primary_object_licensing_country: 'USA',
    primary_object_type: 'Satellite',
    primary_object_mass: 1000,
    primary_object_international_designator: '2023-001A',
    primary_object_launching_year: 2023,
    primary_object_apogee: 500,
    primary_object_perigee: 400,
    primary_object_inclination: 51.6,
    secondary_object_common_name: 'MOCK DEBRIS',
    secondary_object_norad_id: '54321',
    secondary_object_licensing_country: 'RUS',
    secondary_object_type: 'Debris',
    secondary_object_mass: 50,
    secondary_object_international_designator: '2020-001B',
    secondary_object_launching_year: 2020,
    secondary_object_apogee: 450,
    secondary_object_perigee: 350,
    secondary_object_inclination: 52.0,
    is_active: true,
    uploaded_by_id: null,
    deleted_by_id: null,
    file_name: 'mock_fragmentation_report_001.pdf',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    closed_comment: null,
  },
  {
    id: 'mock-report-2',
    short_id: 'FRAG-MOCK-001',
    report_number: 2,
    event_epoch: new Date(Date.now() - 86400000).toISOString(),
    modelled_fragments: 25,
    known_fragments: 12,
    fragmentation_type_comment: 'Updated mock fragmentation analysis report',
    fragmentation_type: 'Propulsion',
    affected_regime: 'LEO',
    conjunction_event_id: null,
    conjunction_commentary: 'Updated mock conjunction commentary',
    object_history: 'Updated mock object history',
    risk: 'High',
    primary_object_common_name: 'MOCK SATELLITE',
    primary_object_norad_id: '12345',
    primary_object_licensing_country: 'USA',
    primary_object_type: 'Satellite',
    primary_object_mass: 1000,
    primary_object_international_designator: '2023-001A',
    primary_object_launching_year: 2023,
    primary_object_apogee: 500,
    primary_object_perigee: 400,
    primary_object_inclination: 51.6,
    secondary_object_common_name: 'MOCK DEBRIS',
    secondary_object_norad_id: '54321',
    secondary_object_licensing_country: 'RUS',
    secondary_object_type: 'Debris',
    secondary_object_mass: 50,
    secondary_object_international_designator: '2020-001B',
    secondary_object_launching_year: 2020,
    secondary_object_apogee: 450,
    secondary_object_perigee: 350,
    secondary_object_inclination: 52.0,
    is_active: true,
    uploaded_by_id: null,
    deleted_by_id: null,
    file_name: 'mock_fragmentation_report_002.pdf',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    closed_comment: null,
  },
];

export async function getFragmentationReports(params: TypeGetFragmentationReportsFragmentationEventShortIdParams) {
  try {
    const { data } = await Api.getFragmentationReportsFragmentationEventShortId(params);

    if (!data || (Array.isArray(data) && data.length === 0)) {
      return sortBy(mockFragmentationReports, 'reportNumber');
    }

    return sortBy(data, 'reportNumber');
  } catch {
    return sortBy(mockFragmentationReports, 'reportNumber');
  }
};
