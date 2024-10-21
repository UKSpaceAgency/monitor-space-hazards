import { auth } from '@/server/auth';

export default async function DashboardPage() {
  const session = await auth();
  return (
    <div>
      {session?.user?.email}
    </div>
  );
}
