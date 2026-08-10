import Link from "@/components/providers/RouteTransition";

import { profile } from "@/app/data/Profile";

const links = [
  { href: "/projects", label: "projects" },
  { href: "/blog", label: "writing" },
  { href: "/about", label: "about" },
  { href: "/certifications", label: "credentials" },
];

const Footer = () => {
  return (
    <footer className="mt-auto w-full border-t border-[var(--line)] py-6">
      <div className="shell flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="meta">
          © {new Date().getFullYear()} {profile.name}
        </p>

        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring text-[0.78rem] text-[var(--dim)] transition-colors hover:text-[var(--ink)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
