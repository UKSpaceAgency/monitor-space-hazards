import { getSession } from '@/actions/getSession';
import { BaseTemplate } from '@/templates/BaseTemplate';

export default async function BothLayout({
  children,
}: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <BaseTemplate showNavigation={!!session}>
      {children}
    </BaseTemplate>

  );
}
