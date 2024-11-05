import type { TypeUserRole } from '@/__generated__/data-contracts';

export const isAnalysist = (role: Nullable<TypeUserRole>): boolean =>
  role === 'AGENCY_SUPERUSER'
  || role === 'AGENCY_ADMIN'
  || role === 'AGENCY_ANALYST'
  || role === 'AGENCY_APPROVER';

export const isOperator = (role: Nullable<TypeUserRole>): boolean =>
  role === 'SATELLITE_OPERATOR'
  || role === 'SATELLITE_OPERATOR_ADMIN'
  || role === 'SATELLITE_OPERATOR_USER';

export const isOrgAdmin = (role: Nullable<TypeUserRole>): boolean =>
  role === 'AGENCY_ADMIN'
  || role === 'AGENCY_ANALYST'
  || role === 'AGENCY_APPROVER'
  || role === 'AGENCY_SUPERUSER'
  || role === 'GOVERNMENT_ADMIN'
  || role === 'SATELLITE_OPERATOR_ADMIN';

export const isAdmin = (role: Nullable<TypeUserRole>): boolean =>
  role === 'SATELLITE_OPERATOR_ADMIN';

export const isSuperAdmin = (role: Nullable<TypeUserRole>): boolean =>
  role === 'AGENCY_SUPERUSER';

export const isGovUser = (role: Nullable<TypeUserRole>): boolean =>
  role === 'GOVERNMENT_ADMIN'
  || role === 'GOVERNMENT_USER';

export const isSatteliteUser = (role: Nullable<TypeUserRole>): boolean =>
  role === 'SATELLITE_OPERATOR'
  || role === 'SATELLITE_OPERATOR_ADMIN'
  || role === 'SATELLITE_OPERATOR_USER';

export const isAgencyUser = (role: Nullable<TypeUserRole>): boolean =>
  role === 'AGENCY_ADMIN'
  || role === 'AGENCY_ANALYST'
  || role === 'AGENCY_APPROVER'
  || role === 'AGENCY_SUPERUSER'
  || role === 'AGENCY_USER';

export const isAgencyApprover = (role: Nullable<TypeUserRole>): boolean =>
  role === 'AGENCY_SUPERUSER'
  || role === 'AGENCY_APPROVER'
  || role === 'AGENCY_ANALYST';
