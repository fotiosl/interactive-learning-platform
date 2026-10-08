import Link from 'next/link';
import { Home, BookX } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md text-center rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow-xs mb-4">
          <BookX className="h-7 w-7" />
        </div>
        <h1 className="text-xl font-bold text-slate-900">Seite oder Schüler nicht gefunden</h1>
        <p className="mt-2 text-xs text-slate-600 leading-relaxed">
          Diese Lerneinheit, das Thema oder der Schülerbereich existiert nicht oder wurde verschoben.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Zur Startseite</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
