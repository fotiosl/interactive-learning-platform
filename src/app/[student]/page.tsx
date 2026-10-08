import { notFound } from 'next/navigation';
import { getStudentBySlug, getAllStudents } from '@/data/students';
import { StudentPageClient } from '@/components/StudentPageClient';
import type { Metadata } from 'next';

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams() {
  return getAllStudents().map((s) => ({
    student: s.slug,
  }));
}

interface StudentPageProps {
  params: Promise<{
    student: string;
  }>;
}

export async function generateMetadata({ params }: StudentPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const student = getStudentBySlug(resolvedParams.student);

  if (!student) {
    return { title: 'Lernplattform' };
  }

  return {
    title: `${student.name} | Lernplattform`,
    description: `Aufgaben und Lernmaterialien für ${student.name}`,
  };
}

export default async function StudentPage({ params }: StudentPageProps) {
  const resolvedParams = await params;
  const student = getStudentBySlug(resolvedParams.student);

  if (!student) {
    notFound();
  }

  const allStudents = getAllStudents().map((s) => ({
    name: s.name,
    slug: s.slug,
    avatarLetter: s.avatarLetter,
  }));

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <StudentPageClient student={student} allStudents={allStudents} />
    </main>
  );
}
