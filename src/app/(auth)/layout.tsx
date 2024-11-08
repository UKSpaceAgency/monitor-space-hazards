import { QueryProvider } from '@/components/QueryProvider';

export default async function AuthLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}
