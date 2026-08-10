export default function Loading() {
  return (
    <div className="page-shell flex min-h-[60vh] flex-col justify-center gap-6 py-20">
      <div className="h-4 w-32 animate-pulse rounded-full bg-slate-200/70 dark:bg-white/5" />
      <div className="h-14 w-3/4 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-white/5" />
      <div className="h-4 w-full max-w-xl animate-pulse rounded-full bg-slate-200/70 dark:bg-white/5" />
      <div className="mt-4 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-56 animate-pulse rounded-[1.75rem] bg-slate-200/70 dark:bg-white/5"
            style={{ animationDelay: `${index * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
