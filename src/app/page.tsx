import { cookies } from 'next/headers';
import { getStudentMetaList, getTeacherDashboardDTO } from '@/data/students';
import { TeacherDashboard } from '@/components/TeacherDashboard';
import { AdminLoginForm } from '@/components/AdminLoginForm';
import { IS_PUBLIC_MODE } from '@/lib/appMode';
import { AUTH_COOKIE_NAME, verifyAdminToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);
  const isAuthenticated = verifyAdminToken(authCookie?.value);

  if (!isAuthenticated) {
    const publicModules = IS_PUBLIC_MODE
      ? getStudentMetaList().map((m) => ({
          slug: m.slug,
          label: m.name.replace(/^[^:]+:\s*/, ''),
          subject: m.subject,
        }))
      : undefined;
    return <AdminLoginForm publicModules={publicModules} />;
  }

  return <TeacherDashboard students={getTeacherDashboardDTO()} />;
}
