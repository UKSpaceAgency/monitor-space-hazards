import { BaseTemplate } from '@/templates/BaseTemplate';

export default async function UnAuthLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <BaseTemplate>
      {children}
    </BaseTemplate>

  );
}
