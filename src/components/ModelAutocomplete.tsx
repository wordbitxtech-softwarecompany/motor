'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Car, Bike, CornerDownLeft } from 'lucide-react';
import { searchModels, type SearchHit } from '@/lib/catalog';
import { formatPKR } from '@/lib/utils';

/**
 * Model-first autocomplete. Typing "cor", "civic", "cd", "ybr"
 * matches instantly — the brand is never required.
 */
/** Renders the model name with the matched substring highlighted. */
function Highlighted({ text, match }: { text: string; match?: { start: number; length: number } }) {
  if (!match || match.start < 0) return <>{text}</>;
  const a = text.slice(0, match.start);
  const b = text.slice(match.start, match.start + match.length);
  const c = text.slice(match.start + match.length);
  return (
    <>
      {a}
      <mark className="bg-transparent text-teal-600 font-black">{b}</mark>
      {c}
    </>
  );
}

export default function ModelAutocomplete({
  placeholder = 'Search any model — try “Corolla”, “Civic”, “CD 70”…',
  size = 'md',
  autoFocus = false,
}: {
  placeholder?: string;
  size?: 'md' | 'lg';
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = 'model-autocomplete-list';

  // Synchronous, in-memory — no network request per keystroke.
  const results = useMemo<SearchHit[]>(() => (q.trim() ? searchModels(q, 8) : []), [q]);

  useEffect(() => setActive(0), [q]);

  // Close on outside click
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const go = useCallback(
    (entry?: SearchHit) => {
      const target = entry ?? results[active];
      if (target) {
        setOpen(false);
        setQ('');
        router.push(target.url);
      }
    },
    [results, active, router]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || results.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go();
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const h = size === 'lg' ? 'h-14 text-[15px]' : 'h-11 text-[13px]';

  return (
    <div ref={boxRef} className="relative w-full">
      <div className="relative">
        <Search
          className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 ${size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`}
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          value={q}
          autoFocus={autoFocus}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label="Search car and bike models"
          aria-autocomplete="list"
          aria-expanded={open && results.length > 0}
          aria-controls={listId}
          role="combobox"
          className={`w-full ${h} pl-11 pr-10 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition`}
        />
        {q && (
          <button
            type="button"
            onClick={() => { setQ(''); inputRef.current?.focus(); }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {open && q.trim() && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
          {results.length > 0 ? (
            <ul id={listId} role="listbox" className="max-h-[22rem] overflow-y-auto py-1">
              {results.map((r, i) => (
                <li key={r.url} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                      i === active ? 'bg-slate-900 text-white' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-9 h-9 shrink-0 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden">
                      <img src={r.logo} alt="" aria-hidden="true" className="w-6 h-6 object-contain" width={24} height={24} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block text-[13px] font-bold truncate ${i === active ? 'text-white' : 'text-slate-900'}`}>
                        {r.brand}{' '}
                        {i === active ? r.model : <Highlighted text={r.model} match={r.match} />}
                        {r.fuzzy && (
                          <span className={`ml-1.5 text-[9px] font-bold uppercase ${i === active ? 'text-slate-400' : 'text-slate-400'}`}>
                            did you mean?
                          </span>
                        )}
                      </span>
                      <span className={`block text-[11px] truncate ${i === active ? 'text-slate-300' : 'text-slate-500'}`}>
                        {r.type} · {r.body} · {r.fuel}
                        {r.priceMin > 0 ? ` · from ${formatPKR(r.priceMin)}` : ''}
                      </span>
                    </span>
                    <span className={`shrink-0 ${i === active ? 'text-teal-300' : 'text-slate-300'}`} aria-hidden="true">
                      {r.type === 'Bike' ? <Bike className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-6 text-center text-xs text-slate-500">
              No models match “{q}”. Try a shorter term like <strong>Corolla</strong> or <strong>CD 70</strong>.
            </p>
          )}

          <div className="flex items-center justify-between px-3 py-2 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3" aria-hidden="true" /> Enter to open
            </span>
            <span>↑ ↓ to navigate</span>
          </div>
        </div>
      )}
    </div>
  );
}
