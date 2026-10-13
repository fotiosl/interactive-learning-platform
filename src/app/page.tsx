import { cookies } from 'next/headers';
import { getAllStudents } from '@/data/students';
import { TeacherDashboard } from '@/components/TeacherDashboard';
import { AdminLoginForm } from '@/components/AdminLoginForm';
import { AUTH_COOKIE_NAME, verifyAdminToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(AUTH_COOKIE_NAME);
  const isAuthenticated = verifyAdminToken(authCookie?.value);

  if (!isAuthenticated) {
    return <AdminLoginForm />;
  }

  return <TeacherDashboard students={getAllStudents()} />;
}

