'use client';

import { useState } from 'react';
import { Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

export function AdminLoginForm() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md mb-6">
          <Lock className="h-6 w-6" />
        </div>

        <h1 className="text-center text-xl font-bold tracking-tight text-slate-900">
          Lehrer-Portal
        </h1>
        <p className="mt-1 text-center text-xs text-slate-500">
          Bitte gib dein Admin-Passwort ein, um zur Schülerverwaltung zu gelangen.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin-Passwort..."
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

        
        <div className="mt-6 border-t border-slate-100 pt-5 text-center">
          <p className="text-xs font-semibold text-slate-700 mb-3">
            Oder direkt als Gast die Lernmodule testen:
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            <a href="/deutsch-bericht" className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Bericht</a>
            <a href="/deutsch-balladen" className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Balladen</a>
            <a href="/deutsch-eroerterung" className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Erörterung</a>
            <a href="/deutsch-grammatik" className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Grammatik</a>
            <a href="/deutsch-kurzgeschichten" className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Kurzgeschichten</a>
            <a href="/deutsch-epochen" className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Epochen & Lyrik</a>
            <a href="/mathematik-statistik-geometrie" className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Mathematik</a>
            <a href="/rechnungswesen" className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Rechnungswesen</a>
            <a href="/informatik-java" className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Java</a>
            <a href="/englisch-new-york" className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Englisch: NYC</a>
            <a href="/englisch-conditionals" className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Conditionals</a>
            <a href="/englisch-fragen-satzbau" className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Fragen & Satzbau</a>
          </div>
        </div>
      </div>
    </div>
  );
}
