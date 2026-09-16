import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import SchemaJsonLd from './SchemaJsonLd';
import { breadcrumbSchema } from '@/lib/seo';

export interface Crumb {
  name: string;
  path: string;
}

/** Visual breadcrumbs + BreadcrumbList JSON-LD (server rendered). */
export default function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  return (
    <>
      <SchemaJsonLd schema={breadcrumbSchema(items)} />
      <nav aria-label="Breadcrumb" className="w-full">
        <ol className={`flex flex-wrap items-center gap-1.5 text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className={`w-3.5 h-3.5 ${dark ? 'text-slate-600' : 'text-slate-300'}`} aria-hidden="true" />}
                {last ? (
                  <span className={`font-semibold ${dark ? 'text-white' : 'text-slate-900'}`} aria-current="page">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className={dark ? 'hover:text-white transition-colors' : 'hover:text-slate-900 transition-colors'}>
                    {c.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
