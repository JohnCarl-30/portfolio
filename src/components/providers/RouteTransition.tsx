"use client";

import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";

type RouteTransitionValue = {
  navigate: (href: string) => void;
  isPending: boolean;
};

const RouteTransitionContext = createContext<RouteTransitionValue | null>(null);

/**
 * The browser holds the outgoing frame frozen until the transition callback
 * resolves. If a route ever stalls, that reads as a hung page — so the hold is
 * capped and the transition proceeds regardless.
 */
const MAX_HOLD_MS = 700;

/** Only show the progress bar if navigation outlives this; avoids a flash. */
const PROGRESS_AFTER_MS = 180;

/**
 * Cross-fades App Router navigations with the View Transitions API.
 *
 * Next has no built-in hook for this on the stable React channel, so the flow
 * is: freeze the current frame, push the route inside a React transition, and
 * release the freeze from an effect once the new pathname has committed.
 *
 * Falls back to a plain `router.push` when the API is missing (Firefox) or the
 * user asked for reduced motion.
 */
export function RouteTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const releaseRef = useRef<(() => void) | null>(null);
  const [isPending, startTransition] = useTransition();

  // New route committed — let the frozen snapshot go.
  useEffect(() => {
    releaseRef.current?.();
    releaseRef.current = null;
  }, [pathname]);

  const navigate = useCallback(
    (href: string) => {
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!document.startViewTransition || calm) {
        startTransition(() => router.push(href));
        return;
      }

      document.documentElement.dataset.transition = "route";

      const transition = document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            const release = () => {
              releaseRef.current = null;
              resolve();
            };

            releaseRef.current = release;
            window.setTimeout(release, MAX_HOLD_MS);
            startTransition(() => router.push(href));
          }),
      );

      transition.finished.finally(() => {
        delete document.documentElement.dataset.transition;
      });
    },
    [router],
  );

  return (
    <RouteTransitionContext.Provider value={{ navigate, isPending }}>
      {children}
      <NavigationProgress active={isPending} />
    </RouteTransitionContext.Provider>
  );
}

/**
 * Indeterminate bar for navigations slow enough to notice. Pages here are
 * prerendered and prefetched, so in practice this stays unmounted — it exists
 * for cold caches and slow connections.
 */
function NavigationProgress({ active }: { active: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => setVisible(true), PROGRESS_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [active]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px overflow-hidden"
    >
      <div className="h-full w-full bg-[var(--signal)] [animation:nav-progress_1.1s_ease-in-out_infinite]" />
    </div>
  );
}

/**
 * Drop-in replacement for `next/link` that routes through the transition.
 *
 * Anything the browser should own — new tabs, modified clicks, downloads,
 * external hosts, same-page hashes — falls through to the default behaviour,
 * as does anything rendered outside the provider.
 */
export default function Link({
  href,
  onClick,
  ...rest
}: ComponentProps<typeof NextLink>) {
  const context = useContext(RouteTransitionContext);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const url = typeof href === "string" ? href : null;

    if (
      !context ||
      !url ||
      !url.startsWith("/") ||
      url.startsWith("//") ||
      url.includes("#") ||
      rest.target === "_blank" ||
      rest.download !== undefined ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    context.navigate(url);
  };

  return <NextLink href={href} onClick={handleClick} {...rest} />;
}

export function useRouteTransition() {
  return useContext(RouteTransitionContext);
}
