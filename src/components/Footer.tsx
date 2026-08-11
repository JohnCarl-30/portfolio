import { ArrowUpRight } from "lucide-react";

import Link from "@/components/providers/RouteTransition";
import LocalTime from "@/components/LocalTime";
import { profile, socials } from "@/app/data/Profile";

const links = [
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "writing" },
  { href: "/about", label: "about" },
  { href: "/certifications", label: "credentials" },
];

const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-[var(--line)] py-14 sm:py-16">
      <div className="shell flex flex-col gap-8">
        <p
          aria-hidden="true"
          className="select-none font-[family-name:var(--font-script)] text-[2.4rem] leading-none text-[var(--ink)]"
        >
          jc
        </p>

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[0.85rem] font-semibold text-[var(--ink)]">
            {profile.name.toLowerCase()}
            <span className="ml-2 font-normal text-[var(--muted-ink)]">
              {profile.role.toLowerCase()} · {profile.location.toLowerCase()}
            </span>
          </p>

          <nav aria-label="Site" className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring text-[0.85rem] text-[var(--muted-ink)] transition-colors hover:text-[var(--ink)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="rule" />

        <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="meta">
              © {new Date().getFullYear()} {profile.name}
            </p>
            <LocalTime />
          </div>

          <nav aria-label="Social links" className="flex flex-wrap gap-x-4 gap-y-2">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/social focus-ring inline-flex items-center gap-0.5 text-[0.85rem] text-[var(--muted-ink)] transition-colors hover:text-[var(--ink)]"
              >
                {social.label}
                <ArrowUpRight className="h-3 w-3 text-[var(--dim)] transition-transform duration-200 group-hover/social:-translate-y-px group-hover/social:translate-x-px" />
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="group/social focus-ring inline-flex items-center gap-0.5 text-[0.85rem] text-[var(--muted-ink)] transition-colors hover:text-[var(--ink)]"
            >
              email
              <ArrowUpRight className="h-3 w-3 text-[var(--dim)] transition-transform duration-200 group-hover/social:-translate-y-px group-hover/social:translate-x-px" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
