import { QueryProvider } from '@/components/QueryProvider';
import { BaseTemplate } from '@/templates/BaseTemplate';

export default async function AuthLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <BaseTemplate showNavigation>
      <QueryProvider>
        {children}
      </QueryProvider>
    </BaseTemplate>

  );
}
