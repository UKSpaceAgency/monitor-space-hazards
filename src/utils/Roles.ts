import type { TypeUserRole } from '@/__generated__/data-contracts';

export const isAnalysist = (role: Nullable<TypeUserRole>): boolean => {
  const analysistRoles: TypeUserRole[] = [
    'AGENCY_SUPERUSER',
    'AGENCY_ADMIN',
    'AGENCY_ANALYST',
    'AGENCY_APPROVER',
  ];

  return !!role && analysistRoles.includes(role);
};

export const isOperator = (role: Nullable<TypeUserRole>): boolean => {
  const operatorRoles: TypeUserRole[] = [
    'SATELLITE_OPERATOR',
    'SATELLITE_OPERATOR_ADMIN',
    'SATELLITE_OPERATOR_USER',
  ];

  return !!role && operatorRoles.includes(role);
};

export const isOrgAdmin = (role: Nullable<TypeUserRole>): boolean => {
  const orgAdminRoles: TypeUserRole[] = [
    'AGENCY_ADMIN',
    'AGENCY_ANALYST',
    'AGENCY_APPROVER',
    'AGENCY_SUPERUSER',
    'GOVERNMENT_ADMIN',
    'SATELLITE_OPERATOR_ADMIN',
  ];

  return !!(role && orgAdminRoles.includes(role));
};

export const isAdmin = (role: Nullable<TypeUserRole>): boolean => {
  const adminRoles: TypeUserRole[] = [
    'SATELLITE_OPERATOR_ADMIN',
  ];

  return !!role && adminRoles.includes(role);
};

export const isSuperAdmin = (role: Nullable<TypeUserRole>): boolean => {
  const superAdminRoles: TypeUserRole[] = [
    'AGENCY_SUPERUSER',
  ];

  return !!role && superAdminRoles.includes(role);
};

export const isGovUser = (role: Nullable<TypeUserRole>): boolean => {
  const govUserRoles: TypeUserRole[] = [
    'GOVERNMENT_ADMIN',
    'GOVERNMENT_USER',
  ];

  return !!role && govUserRoles.includes(role);
};

export const isSatteliteUser = (role: Nullable<TypeUserRole>): boolean => {
  const satteliteUserRoles: TypeUserRole[] = [
    'SATELLITE_OPERATOR',
    'SATELLITE_OPERATOR_ADMIN',
    'SATELLITE_OPERATOR_USER',
  ];

  return !!role && satteliteUserRoles.includes(role);
};

export const isSatteliteOperator = (role: Nullable<TypeUserRole>): boolean => {
  const satteliteUserRoles: TypeUserRole[] = [
    'SATELLITE_OPERATOR',
    'SATELLITE_OPERATOR_ADMIN',
  ];

  return !!role && satteliteUserRoles.includes(role);
};

export const isAgencyUser = (role: Nullable<TypeUserRole>): boolean => {
  const agencyUserRoles: TypeUserRole[] = [
    'AGENCY_ADMIN',
    'AGENCY_ANALYST',
    'AGENCY_APPROVER',
    'AGENCY_SUPERUSER',
    'AGENCY_USER',
  ];

  return !!role && agencyUserRoles.includes(role);
};

export const isAgencyApprover = (role: Nullable<TypeUserRole>): boolean => {
  const agencyApproverRoles: TypeUserRole[] = [
    'AGENCY_SUPERUSER',
    'AGENCY_APPROVER',
    'AGENCY_ANALYST',
  ];

  return !!role && agencyApproverRoles.includes(role);
};

export const AccountType: Record<TypeUserRole, string> = {
  AGENCY_ADMIN: 'Agency Admin',
  AGENCY_ANALYST: 'Agency Analyst',
  AGENCY_APPROVER: 'Agency Approver',
  AGENCY_SUPERUSER: 'Agency Superuser',
  AGENCY_USER: 'Agency User',
  GOVERNMENT_USER: 'Government User',
  GOVERNMENT_ADMIN: 'Government Admin',
  SATELLITE_OPERATOR_ADMIN: 'Satellite Admin',
  SATELLITE_OPERATOR_USER: 'Satellite User',
  SATELLITE_OPERATOR: 'Satellite Operator',
};
