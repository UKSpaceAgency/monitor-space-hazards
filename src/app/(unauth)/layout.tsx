import { BaseTemplate } from '@/templates/BaseTemplate';

export default async function AuthLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <BaseTemplate>
      {children}
    </BaseTemplate>

  );
}
