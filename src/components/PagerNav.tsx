import Link from "@/components/providers/RouteTransition";
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
    <nav aria-label="Pagination" className="mt-14 grid gap-3 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="group focus-ring block rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 transition-colors hover:bg-[var(--hover)]"
        >
          <p className="meta flex items-center gap-1.5">
            <ArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-0.5" />
            {prev.kicker}
          </p>
          <p className="row-title mt-1.5 truncate">{prev.title}</p>
        </Link>
      ) : (
        <div aria-hidden />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group focus-ring block rounded-lg border border-[var(--line)] bg-[var(--panel)] p-4 text-right transition-colors hover:bg-[var(--hover)]"
        >
          <p className="meta flex items-center justify-end gap-1.5">
            {next.kicker}
            <ArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </p>
          <p className="row-title mt-1.5 truncate">{next.title}</p>
        </Link>
      ) : (
        <div aria-hidden />
      )}
    </nav>
  );
}
