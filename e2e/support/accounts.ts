import path from 'node:path';

import type { TypeUserRole } from '@/__generated__/data-contracts';
import {
  isAgencyApprover,
  isAgencyApproverOrSuperuser,
  isAgencyUser,
  isAnalysist,
  isInternationalUser,
  isOrgAdmin,
  isRegulatorUser,
  isSatteliteOperator,
  isSatteliteUser,
  isSuperAdmin,
} from '@/utils/Roles';

export type TestAccount = {
  key: string;
  role: TypeUserRole;
  email: string;
};

const account = (key: string, role: TypeUserRole): TestAccount => ({
  key,
  role,
  email: `monitorspace+Dev${key}@outlook.com`,
});

export const ACCOUNTS: TestAccount[] = [
  account('GovernmentAdmin', 'GOVERNMENT_ADMIN'),
  account('GovernmentUser', 'GOVERNMENT_USER'),
  account('SatelliteAdmin', 'SATELLITE_OPERATOR_ADMIN'),
  account('SatelliteUser', 'SATELLITE_OPERATOR_USER'),
  account('SatelliteOperator', 'SATELLITE_OPERATOR'),
  account('InternationalAdmin', 'INTERNATIONAL_ADMIN'),
  account('InternationalUser', 'INTERNATIONAL_USER'),
  account('RegulatorAdmin', 'REGULATOR_ADMIN'),
  account('RegulatorUser', 'REGULATOR_USER'),
  account('AgencyAdmin', 'AGENCY_ADMIN'),
  account('AgencyUser', 'AGENCY_USER'),
  account('AgencyAnalyst', 'AGENCY_ANALYST'),
  account('AgencyApprover', 'AGENCY_APPROVER'),
  account('AgencySuperuser', 'AGENCY_SUPERUSER'),
];

// The account used for feature tests, because it can see every page
export const SUPERUSER = 'AgencySuperuser';

// Optional comma-separated filter, e.g. E2E_ROLES=AgencySuperuser,SatelliteUser
export const selectedAccounts = (): TestAccount[] => {
  const filter = process.env.E2E_ROLES?.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  if (!filter?.length || filter.includes('all')) {
    return ACCOUNTS;
  }
  return ACCOUNTS.filter(a => filter.includes(a.key.toLowerCase()));
};

export const accountByKeyOrThrow = (key: string): TestAccount => {
  const found = ACCOUNTS.find(a => a.key === key);
  if (!found) {
    throw new Error(`Unknown test account ${key}`);
  }
  return found;
};

export const AUTH_DIR = path.resolve(__dirname, '../../playwright/.auth');

export const storageStatePath = (key: string) => path.join(AUTH_DIR, `${key}.json`);

/**
 * Which pages each role should be able to open.
 * Mirrors the checks in src/app/(auth)/** so the suite fails if access rules drift.
 * `{conjunction}` etc. are replaced with real IDs found on dev at the start of each run.
 *
 * /account/credentials is deliberately left out: opening it calls
 * postUsersMeClientCredentials, which writes to the database.
 */
export type PageRule = {
  path: string;
  heading: RegExp;
  allowed: (role: TypeUserRole) => boolean;
};

const everyone = () => true;

export const PAGE_RULES: PageRule[] = [
  { path: '/home', heading: /Monitor Space Hazards/i, allowed: everyone },
  { path: '/conjunctions', heading: /Track conjunction events/i, allowed: r => !isInternationalUser(r) },
  { path: '/re-entries', heading: /Track re-entry events/i, allowed: everyone },
  { path: '/fragmentations', heading: /Track fragmentation events/i, allowed: everyone },
  { path: '/satellites', heading: /UK-licensed satellites/i, allowed: r => !isInternationalUser(r) },
  { path: '/organisations', heading: /^Organisations$/i, allowed: r => !isInternationalUser(r) },
  { path: '/activity', heading: /Track UK satellite activity/i, allowed: r => isAgencyUser(r) || isRegulatorUser(r) },
  { path: '/performance-monitoring', heading: /Performance monitoring and statistics/i, allowed: everyone },
  { path: '/contact', heading: /^Contact$/i, allowed: everyone },
  { path: '/account', heading: /Your account information/i, allowed: everyone },
  { path: '/account/contact-and-organisation-information', heading: /View your account details/i, allowed: everyone },
  { path: '/account/terms-and-conditions', heading: /View Terms and Conditions/i, allowed: everyone },
  { path: '/account/notification-settings', heading: /Choose your notification settings/i, allowed: everyone },
  { path: '/account/event-notification-thresholds-settings', heading: /conjunction event notification thresholds/i, allowed: everyone },
  { path: '/account/alert-settings', heading: /Edit your communication settings/i, allowed: r => !isSatteliteUser(r) },
  { path: '/account/add-new-user', heading: /Add a new user/i, allowed: isOrgAdmin },
  { path: '/account/organisations', heading: /^Organisations$/i, allowed: isAgencyApprover },
  { path: '/account/distribution-list', heading: /View distribution lists/i, allowed: isAgencyApprover },
  { path: '/account/incident-banner', heading: /Manage incident banners/i, allowed: isSuperAdmin },
  { path: '/account/incident-banner/schedule', heading: /Manage incident banners/i, allowed: isSuperAdmin },
  { path: '/account/analysis-upload-log', heading: /NSpOC analysis uploads/i, allowed: isAnalysist },
  { path: '/account/ephemeris-upload-log', heading: /Ephemeris uploads/i, allowed: isAnalysist },
  { path: '/account/manoeuvre-support-upload-log', heading: /Manoeuvre support uploads/i, allowed: isAnalysist },
  // Detail pages
  { path: '/conjunctions/{conjunction}', heading: /Conjunction event/i, allowed: r => !isInternationalUser(r) },
  { path: '/conjunctions/{conjunction}/analysis-upload', heading: /Upload NSpOC analysis/i, allowed: isAgencyApprover },
  { path: '/re-entries/{reentry}', heading: /Re-entry event for/i, allowed: everyone },
  { path: '/re-entries/{reentry}/alert/edit', heading: /Re-entry alert for/i, allowed: isAgencyApproverOrSuperuser },
  { path: '/fragmentations/{fragmentation}', heading: /Fragmentation event for/i, allowed: everyone },
  { path: '/fragmentations/{fragmentation}/edit', heading: /Edit fragmentation event/i, allowed: isAgencyApproverOrSuperuser },
  { path: '/fragmentations/{fragmentation}/send-alert', heading: /Send to additional recipients/i, allowed: isAgencyApproverOrSuperuser },
  { path: '/satellites/{satellite}', heading: /./, allowed: r => !isInternationalUser(r) },
  { path: '/satellites/{satellite}/ephemeris-upload', heading: /Uploading your ephemeris data/i, allowed: r => isAgencyApprover(r) || isSatteliteOperator(r) },
  { path: '/organisations/{organisation}', heading: /./, allowed: r => !isInternationalUser(r) },
];

/**
 * Satellite operators only see their own organisation's records, so detail pages are
 * tested with an ID taken from their own list page. Every other role uses the shared IDs.
 */
export const hasScopedData = (role: TypeUserRole) => isSatteliteUser(role);

export const LIST_PAGES: Record<string, { list: string; prefix: string }> = {
  conjunction: { list: '/conjunctions?epoch=all', prefix: '/conjunctions' },
  reentry: { list: '/re-entries?epoch=all', prefix: '/re-entries' },
  fragmentation: { list: '/fragmentations', prefix: '/fragmentations' },
  satellite: { list: '/satellites', prefix: '/satellites' },
  organisation: { list: '/organisations', prefix: '/organisations' },
};

/** Service navigation links each role should see, from src/templates/components/Navigation.tsx */
export const expectedNav = (role: TypeUserRole): string[] => [
  !isSatteliteUser(role) && 'Re-entries',
  !isSatteliteUser(role) && !isInternationalUser(role) && 'Fragmentations',
  !isInternationalUser(role) && 'Conjunctions',
  !isInternationalUser(role) && 'Satellites',
  !isInternationalUser(role) && 'Organisations',
  'Account',
].filter((x): x is string => !!x);
