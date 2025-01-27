import type { ReadonlyURLSearchParams } from 'next/navigation';

export const capitalized = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

export const getBackUrl = (pathname: string, steps: number, searchParams?: ReadonlyURLSearchParams) => `${pathname.split('/').slice(0, -steps).join('/')}${searchParams ? `?${searchParams.toString()}` : ''}`;

export function assertUnreachable(_x: never): never {
  throw new Error('Didn\'t expect to get here');
}
