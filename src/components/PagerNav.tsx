import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type PagerLink = {
  href: string;
  kicker: string;
  title: string;
};

export default function PagerNav({
  prev,
  next,
}: {
  prev?: PagerLink;
  next?: PagerLink;
}) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="Pagination" className="mt-16 grid gap-4 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="group glass-panel focus-ring block rounded-2xl p-5 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            {prev.kicker}
          </p>
          <p className="mt-2 truncate text-base font-semibold tracking-[-0.02em] text-slate-950 transition-colors duration-150 group-hover:text-primary dark:text-white">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div aria-hidden />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group glass-panel focus-ring block rounded-2xl p-5 text-right transition-transform duration-200 hover:-translate-y-0.5"
        >
          <p className="flex items-center justify-end gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            {next.kicker}
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </p>
          <p className="mt-2 truncate text-base font-semibold tracking-[-0.02em] text-slate-950 transition-colors duration-150 group-hover:text-primary dark:text-white">
            {next.title}
          </p>
        </Link>
      ) : (
        <div aria-hidden />
      )}
    </nav>
  );
}
