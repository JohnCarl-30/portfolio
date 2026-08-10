"use client";

type FilterChipsProps = {
  options: string[];
  active: string;
  onChange: (value: string) => void;
  label: string;
};

/** Lowercase, hairline filter row. Same visual weight as the tag chips. */
export default function FilterChips({
  options,
  active,
  onChange,
  label,
}: FilterChipsProps) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-1.5">
      {options.map((option) => {
        const isActive = active === option;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            aria-pressed={isActive}
            className={`focus-ring rounded-full border px-2.5 py-1 font-mono text-[0.75rem] lowercase transition-colors duration-150 ${
              isActive
                ? "border-[var(--signal)]/45 bg-[var(--signal-soft)] text-[var(--signal)]"
                : "border-[var(--line)] text-[var(--dim)] hover:border-[var(--line-strong)] hover:text-[var(--muted-ink)]"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
