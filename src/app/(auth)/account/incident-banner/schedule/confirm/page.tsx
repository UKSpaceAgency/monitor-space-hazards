import type { TypeBannerScheduleIn } from '@/__generated__/data-contracts';

export default async function BannerConfirmSchedulePage(props: {
  searchParams?: Promise<TypeBannerScheduleIn>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div>
      {JSON.stringify(searchParams)}
    </div>
  );
}
