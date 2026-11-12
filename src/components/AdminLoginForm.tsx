'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, ArrowRight, Loader2, AlertCircle, BookOpen, Sparkles } from 'lucide-react';

interface PublicModuleLink {
  slug: string;
  label: string;
  subject: string;
}

interface AdminLoginFormProps {
  publicModules?: PublicModuleLink[];
}

export function AdminLoginForm({ publicModules }: AdminLoginFormProps) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isPublicShowcase = Boolean(publicModules && publicModules.length > 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        window.location.reload();
      } else {
        setError(data.error || 'Ungültiges Passwort');
      }
    } catch {
      setError('Verbindungsfehler beim Anmelden');
    } finally {
      setLoading(false);
    }
  };

  const loginFormCard = (
    <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md mb-6">
        <Lock className="h-6 w-6" />
      </div>

      <h2 className="text-center text-xl font-bold tracking-tight text-slate-900">
        {isPublicShowcase ? 'Demo-Lehrermodus' : 'Lehrer-Portal'}
      </h2>
      <p className="mt-1 text-center text-xs text-slate-500">
        {isPublicShowcase
          ? 'Mit dem Demo-Passwort anmelden, um Musterlösungen und didaktische Hinweise freizuschalten.'
          : 'Bitte gib dein Admin-Passwort ein, um zur Schülerverwaltung zu gelangen.'}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <input
            type="password"
            autoFocus={!isPublicShowcase}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={isPublicShowcase ? 'Demo-Passwort...' : 'Admin-Passwort...'}
            className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 transition-colors focus:border-blue-500 focus:bg-white focus:outline-hidden"
          />
        </div>

        {error && (
          <div className="flex items-center gap-1.5 rounded-lg bg-rose-50 p-2.5 text-xs font-medium text-rose-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !password}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Prüfen...</span>
            </>
          ) : (
            <>
              <span>Anmelden</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {!isPublicShowcase && (
        <div className="mt-6 text-center">
          <p className="text-[11px] text-slate-400">
            Geschützter Bereich • Nur für autorisierte Lehrkräfte
          </p>
        </div>
      )}
    </div>
  );

  if (isPublicShowcase && publicModules) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 mb-3">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Open-Source-Showcase • {publicModules.length} Fachmodule</span>
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  Interactive Learning Platform
                </h1>
                <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
                  Wähle ein Fachmodul aus, um interaktive Übungen, mathematische Rechenwege, Probetests und den Browser-Java-Runner direkt auszuprobieren.
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {publicModules.map((mod) => (
                <Link
                  key={mod.slug}
                  href={`/${mod.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/40 p-4 transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:bg-white hover:shadow-md"
                >
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-md bg-blue-100/80 px-2 py-0.5 text-[11px] font-semibold text-blue-800">
                      <BookOpen className="h-3 w-3" />
                      {mod.subject}
                    </span>
                    <p className="mt-2 text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {mod.label}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs font-semibold text-blue-600">
                    <span>Modul starten</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="flex justify-center">{loginFormCard}</section>
        </div>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      {loginFormCard}
    </div>
  );
}
