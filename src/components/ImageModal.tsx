'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';

interface ImageModalProps {
  src: string;
  alt: string;
  caption?: string;
}

export function ImageModal({ src, alt, caption }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Großansicht öffnen: ${caption || alt}`}
        className="group relative block w-full cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-slate-50 text-left shadow-xs transition-all hover:border-blue-400 hover:shadow-md focus:outline-hidden focus:ring-2 focus:ring-blue-400"
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={900}
          loading="lazy"
          className="max-h-80 w-full object-contain transition-transform duration-200 group-hover:scale-[1.01]"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-md backdrop-blur-xs">
            <Maximize2 className="h-3.5 w-3.5" /> Großansicht öffnen
          </span>
        </span>
      </button>
      {caption && (
        <p className="mt-1.5 text-center text-xs text-slate-600">
          {caption} <span className="font-medium text-blue-600">(Klicken zum Vergrößern)</span>
        </p>
      )}

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={caption || alt}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-h-[92vh] max-w-[95vw] overflow-auto rounded-2xl bg-white p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex justify-between items-center bg-white/95 px-3 py-2 border-b border-slate-100">
              <span className="text-sm font-medium text-slate-800 truncate max-w-[80%]">
                {caption || alt}
              </span>
              <button
                type="button"
                autoFocus
                onClick={() => setIsOpen(false)}
                aria-label="Großansicht schließen"
                className="flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                <X className="h-4 w-4" /> Schließen
              </button>
            </div>
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={1200}
              className="mx-auto max-h-[82vh] w-auto rounded-lg object-contain mt-1"
            />
          </div>
        </div>
      )}
    </div>
  );
}
