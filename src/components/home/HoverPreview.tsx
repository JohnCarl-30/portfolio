"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type PreviewPayload = {
  title: string;
  body: string;
  image?: string;
  meta?: string;
};

type PreviewContextValue = {
  show: (payload: PreviewPayload) => void;
  hide: () => void;
  enabled: boolean;
};

const PreviewContext = createContext<PreviewContextValue | null>(null);

const CARD_WIDTH = 288;
const OFFSET = 22;

/**
 * A single floating card that follows the cursor and swaps its contents as
 * you move between triggers. One card for the whole page keeps the motion
 * continuous — it glides between rows instead of popping per row.
 */
export function PreviewProvider({ children }: { children: ReactNode }) {
  const [payload, setPayload] = useState<PreviewPayload | null>(null);
  const [enabled, setEnabled] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const calm = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 420, damping: 38, mass: 0.6 };
  const x = useSpring(rawX, calm ? { duration: 0 } : spring);
  const y = useSpring(rawY, calm ? { duration: 0 } : spring);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(fine.matches);
    sync();
    fine.addEventListener("change", sync);
    return () => fine.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!payload || !enabled) return;

    const place = (clientX: number, clientY: number, instant: boolean) => {
      const height = cardRef.current?.offsetHeight ?? 180;
      const maxX = window.innerWidth - CARD_WIDTH - 16;
      const maxY = window.innerHeight - height - 16;

      // Flip to the left of the cursor when there is no room on the right.
      const preferred =
        clientX + OFFSET > maxX ? clientX - CARD_WIDTH - OFFSET : clientX + OFFSET;

      const nextX = Math.min(Math.max(preferred, 16), Math.max(maxX, 16));
      const nextY = Math.min(Math.max(clientY + OFFSET, 16), Math.max(maxY, 16));

      if (instant) {
        x.jump(nextX);
        y.jump(nextY);
      }
      rawX.set(nextX);
      rawY.set(nextY);
    };

    let primed = false;
    const handleMove = (event: PointerEvent) => {
      place(event.clientX, event.clientY, !primed);
      primed = true;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [payload, enabled, rawX, rawY, x, y]);

  const show = useCallback((next: PreviewPayload) => setPayload(next), []);
  const hide = useCallback(() => setPayload(null), []);

  const value = useMemo(() => ({ show, hide, enabled }), [show, hide, enabled]);

  return (
    <PreviewContext.Provider value={value}>
      {children}

      {enabled ? (
        <motion.div
          ref={cardRef}
          aria-hidden="true"
          style={{ x, y, width: CARD_WIDTH }}
          className="pointer-events-none fixed left-0 top-0 z-40"
        >
          <AnimatePresence mode="wait">
            {payload ? (
              <motion.div
                key={payload.title}
                initial={{ opacity: 0, scale: 0.96, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -4 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden rounded-xl border border-[var(--line-strong)] bg-[var(--panel)] shadow-[var(--shadow-lift)]"
              >
                {payload.image ? (
                  <div className="relative aspect-[16/10] w-full border-b border-[var(--line)] bg-[var(--panel-soft)]">
                    <Image
                      src={payload.image}
                      alt=""
                      fill
                      sizes="288px"
                      className="object-cover object-top"
                    />
                  </div>
                ) : null}

                <div className="px-3.5 py-3">
                  <p className="row-title">{payload.title}</p>
                  <p className="row-desc mt-1 text-[0.8rem]">{payload.body}</p>
                  {payload.meta ? (
                    <p className="meta mt-2">{payload.meta}</p>
                  ) : null}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </PreviewContext.Provider>
  );
}

export function usePreview() {
  return useContext(PreviewContext);
}

/**
 * Attaches preview handlers to an existing element. Returns props to spread,
 * so callers keep control of their own markup and semantics.
 */
export function usePreviewHandlers(payload: PreviewPayload | null) {
  const preview = usePreview();

  return useMemo(() => {
    if (!preview || !preview.enabled || !payload) return {};
    return {
      onPointerEnter: () => preview.show(payload),
      onPointerLeave: () => preview.hide(),
      onFocus: () => preview.show(payload),
      onBlur: () => preview.hide(),
    };
  }, [preview, payload]);
}

type GlossarySlot = {
  slotId: string;
  openId: string | null;
  open: (id: string, body: string) => void;
  close: () => void;
};

const GlossarySlotContext = createContext<GlossarySlot | null>(null);

/**
 * A paragraph that can hold one expanded glossary definition.
 *
 * The definition renders *below* the paragraph rather than inline after the
 * term — inserting a block mid-sentence pushes the rest of the clause onto its
 * own line and shreds the prose. Only one term per paragraph is open at a
 * time, which keeps the layout shift to a single predictable block.
 */
export function GlossaryParagraph({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const slotId = useId();
  const [note, setNote] = useState<{ id: string; body: string } | null>(null);

  const open = useCallback(
    (id: string, body: string) => setNote({ id, body }),
    [],
  );
  const close = useCallback(() => setNote(null), []);

  const value = useMemo(
    () => ({ slotId, openId: note?.id ?? null, open, close }),
    [slotId, note, open, close],
  );

  return (
    <GlossarySlotContext.Provider value={value}>
      <p className={className}>{children}</p>

      <div id={slotId}>
        <AnimatePresence initial={false}>
          {note ? (
            <motion.div
              role="note"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
              className="overflow-hidden"
            >
              <p className="mt-2.5 border-l-2 border-[var(--signal)] pl-3 text-[0.85rem] leading-relaxed text-[var(--muted-ink)]">
                {note.body}
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </GlossarySlotContext.Provider>
  );
}

/**
 * Inline prose term carrying a definition.
 *
 * It is a real `<button aria-expanded aria-controls>`, so the definition is
 * reachable by keyboard, by screen reader, and by touch — none of which can
 * trigger the floating hover card. On a fine pointer, hover still shows the
 * card; opening the inline copy suppresses it so the same text is never
 * presented twice at once.
 */
export function GlossaryTerm({
  children,
  title,
  body,
}: {
  children: ReactNode;
  title: string;
  body: string;
}) {
  const termId = useId();
  const slot = useContext(GlossarySlotContext);
  const isOpen = slot?.openId === termId;

  const payload = useMemo(() => ({ title, body }), [title, body]);
  const handlers = usePreviewHandlers(isOpen ? null : payload);

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      aria-controls={slot?.slotId}
      onClick={() => (isOpen ? slot?.close() : slot?.open(termId, body))}
      className={`focus-ring inline cursor-help border-0 bg-transparent p-0 text-left font-[inherit] text-[length:inherit] font-semibold underline decoration-dotted underline-offset-4 transition-colors ${
        isOpen
          ? "text-[var(--signal)] decoration-[var(--signal)]"
          : "text-[var(--ink)] decoration-[var(--line-strong)] hover:decoration-[var(--signal)]"
      }`}
      {...handlers}
    >
      {children}
    </button>
  );
}
