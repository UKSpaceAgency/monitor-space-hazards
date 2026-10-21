/**
 * Every route in src/app must be listed in one of three places, or the coverage check fails:
 *
 * - PAGE_RULES in accounts.ts (opened by every test account)
 * - TESTED_ELSEWHERE below (opened by a public or feature test)
 * - EXCLUDED below, with the reason it isn't opened
 *
 * Routes use the app's folder names, e.g. /conjunctions/[shortId]. Route groups like (auth) are dropped.
 */

export const TESTED_ELSEWHERE: Record<string, string> = {
  '/': 'specs/public/public-pages.spec.ts',
  '/accessibility-statement': 'specs/public/public-pages.spec.ts',
  '/cookies': 'specs/public/public-pages.spec.ts',
  '/data-privacy-notice': 'specs/public/public-pages.spec.ts',
  '/feedback': 'specs/public/public-pages.spec.ts',
  '/contact-analyst/conjunctions': 'specs/public/public-pages.spec.ts',
  '/contact-analyst/fragmentations': 'specs/public/public-pages.spec.ts',
  '/contact-analyst/reentries': 'specs/public/public-pages.spec.ts',
  '/forbidden': 'specs/access/role-access.spec.ts (pages blocked for a role redirect here)',
  '/activity/[shortId]': 'specs/features/satellites-organisations.spec.ts',
  '/account/alert-settings/[id]': 'specs/features/account.spec.ts',
  '/account/organisations/[id]': 'specs/features/account.spec.ts',
  '/account/organisations/[id]/[userId]': 'specs/features/account.spec.ts',
  '/account/organisations/[id]/[userId]/email': 'specs/features/account.spec.ts',
  '/account/organisations/[id]/[userId]/phone': 'specs/features/account.spec.ts',
  '/account/organisations/[id]/[userId]/type': 'specs/features/account.spec.ts',
  '/conjunctions/[shortId]/alert': 'specs/features/conjunctions.spec.ts',
  '/conjunctions/[shortId]/alert/edit': 'specs/features/conjunctions.spec.ts',
  '/conjunctions/[shortId]/alert/send-alert': 'specs/features/conjunctions.spec.ts',
  '/re-entries/[shortId]/alert': 'specs/features/reentries-fragmentations.spec.ts',
  '/re-entries/[shortId]/alert/send-alert': 'specs/features/reentries-fragmentations.spec.ts',
  '/page/[slug]': 'specs/features/home-performance.spec.ts',
};

const AFTER_SUBMIT = 'Only reached by submitting the previous step, which would change data';

export const EXCLUDED: Record<string, string> = {
  '/account/credentials': 'Opening it calls postUsersMeClientCredentials, which creates credentials',
  '/account/setup': 'Only shown to users who haven\'t finished account setup; all test accounts have',
  '/account/incident-banner/schedule/confirm': AFTER_SUBMIT,
  '/conjunctions/[shortId]/alert/edit/review': AFTER_SUBMIT,
  '/conjunctions/[shortId]/alert/edit/review/preview': AFTER_SUBMIT,
  '/conjunctions/[shortId]/alert/send-alert/review': AFTER_SUBMIT,
  '/conjunctions/[shortId]/alert/send-alert/success': AFTER_SUBMIT,
  '/conjunctions/[shortId]/analysis-upload/successful': AFTER_SUBMIT,
  '/fragmentations/[shortId]/edit/review': AFTER_SUBMIT,
  '/fragmentations/[shortId]/edit/review/preview': AFTER_SUBMIT,
  '/fragmentations/[shortId]/send-alert/review': AFTER_SUBMIT,
  '/fragmentations/[shortId]/send-alert/success': AFTER_SUBMIT,
  '/re-entries/[shortId]/alert/edit/review': AFTER_SUBMIT,
  '/re-entries/[shortId]/alert/edit/review/preview': AFTER_SUBMIT,
  '/re-entries/[shortId]/alert/send-alert/review': AFTER_SUBMIT,
  '/re-entries/[shortId]/alert/send-alert/success': AFTER_SUBMIT,
  '/satellites/[noradId]/ephemeris-upload/upload-success': AFTER_SUBMIT,
  '/contact-analyst/send': AFTER_SUBMIT,
  '/feedback/success': AFTER_SUBMIT,
};

/** Compare routes ignoring parameter names: /conjunctions/[shortId] matches /conjunctions/{conjunction}. */
export const normaliseRoute = (route: string) =>
  route.split('?')[0]!.replace(/\[[^\]]+\]|\{[^}]+\}/g, '*');
