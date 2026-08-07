'use client'

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useAppUI } from "@/components/providers/AppUIProvider";
import { Kbd } from "@/components/ui/kbd";
import ThemeToggle from "@/components/ThemeToggle";
import { RESUME_URL, socialLinks } from "@/app/data/Social";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const { isSearchOpen, openSearch } = useAppUI();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isLinkActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Close the sheet whenever navigation happens.
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // The sticky bar only grows a border once content sits underneath it.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll, close on Escape, and move focus into the sheet while open.
  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const triggerButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerButton?.focus();
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`sticky top-0 z-40 w-full border-b bg-background/70 py-4 backdrop-blur-md transition-colors duration-200 md:py-6 ${
          isScrolled ? "border-border/60" : "border-transparent"
        }`}
      >
      <div className="page-shell">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            className="focus-ring font-mono text-sm font-semibold tracking-tight text-foreground transition-colors duration-150 hover:text-primary"
          >
            JC.
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`focus-ring group relative text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-primary transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openSearch}
              aria-expanded={isSearchOpen}
              aria-haspopup="dialog"
              aria-label="Open global search"
              className="focus-ring flex cursor-pointer items-center gap-3 rounded-full border border-border/70 bg-card/70 px-3 py-2 text-left transition-[color,background-color,border-color,transform] duration-150 hover:border-primary/40 hover:bg-card active:scale-[0.98]"
            >
              <Search className="h-4 w-4 text-primary" />
              <span className="hidden text-sm text-muted-foreground sm:inline">
                Search
              </span>
              <span className="ml-auto hidden items-center gap-1 md:flex">
                <Kbd className="border-border bg-background text-muted-foreground">
                  ⌘
                </Kbd>
                <Kbd className="border-border bg-background text-muted-foreground">
                  K
                </Kbd>
              </span>
            </button>

            <ThemeToggle />

            <Link
              href={RESUME_URL}
              target="_blank"
              className="focus-ring group relative hidden overflow-hidden rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground transition-[color,border-color,transform] duration-150 hover:border-primary/50 active:scale-[0.98] sm:inline-block"
            >
              <span className="relative z-10 inline-block transition-transform duration-200 group-hover:-translate-y-full">
                Resume
              </span>
              <span className="absolute inset-0 flex items-center justify-center translate-y-full text-primary transition-transform duration-200 group-hover:translate-y-0">
                Resume
              </span>
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-haspopup="dialog"
              className="focus-ring inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border/70 bg-card/70 text-foreground transition-[border-color,transform] duration-150 hover:border-primary/40 active:scale-[0.98] md:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Rendered outside <nav>: the navbar's backdrop-blur creates a
          containing block, which would trap this fixed overlay inside it. */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[60] md:hidden"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="absolute inset-y-0 right-0 flex w-[min(20rem,85vw)] flex-col border-l border-border bg-background shadow-2xl"
              initial={shouldReduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={shouldReduceMotion ? undefined : { x: "100%" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", damping: 30, stiffness: 300 }
              }
            >
              <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-border px-6">
                <span className="font-mono text-sm font-semibold text-foreground">
                  Menu
                </span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                  className="focus-ring inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border/70 text-foreground transition-[border-color,transform] duration-150 hover:border-primary/40 active:scale-[0.98]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                {navLinks.map((link) => {
                  const isActive = isLinkActive(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`focus-ring rounded-xl px-3 py-3 text-base font-medium transition-colors duration-150 ${
                        isActive
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="shrink-0 space-y-4 border-t border-border p-4">
                <Link
                  href={RESUME_URL}
                  target="_blank"
                  className="focus-ring flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform duration-150 active:scale-[0.98]"
                >
                  Resume
                </Link>

                <div className="flex items-center justify-center gap-3">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        aria-label={item.label}
                        className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-[color,border-color,transform] duration-150 hover:border-primary/40 hover:text-foreground active:scale-[0.98]"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
