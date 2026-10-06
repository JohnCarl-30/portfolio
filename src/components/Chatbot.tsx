"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import { Dialog, VisuallyHidden } from "radix-ui";

type ChatApiResponse = {
  reply?: string | null;
  error?: string;
  source?: "openai" | "fallback";
};

const quickReplies = [
  "Which projects should I look at first?",
  "What AI work has he built?",
  "How do I get in touch?",
];

const MAX_CHARACTERS = 1000;

const parseApiResponse = async (response: Response): Promise<ChatApiResponse> => {
  const rawBody = await response.text();
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return JSON.parse(rawBody) as ChatApiResponse;
  }

  try {
    return JSON.parse(rawBody) as ChatApiResponse;
  } catch {
    // The raw body is for the console, never for the chat bubble — it is
    // usually an HTML error page and means nothing to a reader.
    throw new Error(
      `Server returned a non-JSON response: ${rawBody.slice(0, 300)}`,
    );
  }
};

type ChatMessage = {
  role: "user" | "bot";
  content: string;
  /** Present on a failed exchange; carries the text a retry should resend. */
  retryText?: string;
};

const Chatbot = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      content:
        "Hi — I'm an assistant for John Carl's portfolio. Ask about his AI work, the stack behind a project, his experience, or how to reach him.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    }
  }, [messages, isLoading, shouldReduceMotion]);

  /** Sends without echoing a user bubble, so a retry does not duplicate it. */
  const send = async (messageText: string) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await parseApiResponse(response);
      if (!response.ok || data.error) {
        throw new Error(data.error || "Request failed");
      }

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.reply || "I don't have an answer for that one." },
      ]);
    } catch (error: unknown) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Couldn't reach the assistant. Check your connection, then try again.",
          retryText: messageText,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (text?: string) => {
    const messageText = text?.trim() || input.trim();
    if (!messageText || isLoading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: messageText }]);
    void send(messageText);
  };

  const handleRetry = (text: string) => {
    if (isLoading) return;
    setMessages((prev) => prev.filter((message) => !message.retryText));
    void send(text);
  };

  const showQuickReplies =
    messages.length === 1 && messages[0].role === "bot" && !isLoading;

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {/* Launcher. Not a Dialog.Trigger, so tapping it can also close the
          panel; Radix restores focus here either way. */}
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? "Close portfolio assistant" : "Open portfolio assistant"}
        aria-expanded={isOpen}
        className="focus-ring fixed bottom-4 right-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line-strong)] bg-[var(--panel)]/85 text-[var(--muted-ink)] shadow-[var(--shadow-soft)] backdrop-blur-xl transition-colors duration-150 hover:text-[var(--ink)] enabled:active:scale-[0.96]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? "close" : "open"}
            initial={
              shouldReduceMotion ? false : { rotate: -90, opacity: 0, scale: 0.7 }
            }
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={
              shouldReduceMotion ? undefined : { rotate: 90, opacity: 0, scale: 0.7 }
            }
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="flex h-6 w-6 items-center justify-center"
          >
            {isOpen ? (
              <X aria-hidden="true" size={20} />
            ) : (
              <MessageCircle aria-hidden="true" size={20} />
            )}
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <Dialog.Portal forceMount>
            <Dialog.Content
              asChild
              forceMount
              aria-describedby={undefined}
              onOpenAutoFocus={(event) => {
                event.preventDefault();
                inputRef.current?.focus();
              }}
            >
              <motion.div
                initial={
                  shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.95 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  shouldReduceMotion ? undefined : { opacity: 0, y: 20, scale: 0.95 }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.25, ease: "easeOut" }
                }
                style={{ transformOrigin: "bottom right" }}
                className="fixed bottom-16 right-4 z-50 flex h-[70dvh] max-h-[500px] w-[min(350px,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-[var(--line-strong)] bg-[var(--panel)] shadow-[var(--shadow-lift)]"
              >
                {/* Header. Named for what it is: the responder is a model, not
                    John Carl, so there is no presence indicator and no photo
                    of him. */}
                <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] px-4 py-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--hover)] text-[var(--muted-ink)]">
                      <Bot aria-hidden="true" size={16} />
                    </span>
                    <span className="min-w-0">
                      <Dialog.Title className="block truncate text-[0.875rem] font-semibold text-[var(--ink)]">
                        Portfolio assistant
                      </Dialog.Title>
                      <span className="meta block truncate">
                        answers about John Carl&apos;s work
                      </span>
                    </span>
                  </div>

                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close assistant"
                      className="focus-ring shrink-0 rounded-lg p-1 text-[var(--muted-ink)] transition-colors duration-150 hover:bg-[var(--hover)] hover:text-[var(--ink)]"
                    >
                      <X aria-hidden="true" size={18} />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Replies arrive asynchronously, so the transcript is a polite
                    live region — otherwise an answer lands silently. */}
                <div
                  ref={scrollRef}
                  role="log"
                  aria-live="polite"
                  aria-label="Conversation"
                  className="flex-1 space-y-3 overscroll-contain overflow-y-auto p-4"
                >
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={
                        shouldReduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }
                      }
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl px-3 py-2 text-[0.85rem] leading-relaxed ${
                          msg.role === "user"
                            ? "bg-[var(--ink)] text-[var(--paper)]"
                            : msg.retryText
                              ? "border border-[var(--line-strong)] bg-[var(--hover)] text-[var(--ink)]"
                              : "bg-[var(--panel-soft)] text-[var(--ink)]"
                        }`}
                      >
                        {msg.content}

                        {msg.retryText ? (
                          <button
                            type="button"
                            onClick={() => handleRetry(msg.retryText as string)}
                            disabled={isLoading}
                            className="focus-ring mt-2 block rounded-md border border-[var(--line-strong)] px-2.5 py-1 text-[0.78rem] font-medium text-[var(--ink)] transition-colors hover:bg-[var(--panel)] disabled:pointer-events-none disabled:opacity-50"
                          >
                            Try again
                          </button>
                        ) : null}
                      </div>
                    </motion.div>
                  ))}

                  <AnimatePresence>
                    {showQuickReplies ? (
                      <motion.div
                        key="quick-replies"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                          hidden: {},
                          visible: { transition: { staggerChildren: 0.06 } },
                        }}
                        className="flex flex-wrap gap-2 pt-1"
                      >
                        {quickReplies.map((reply) => (
                          <motion.button
                            key={reply}
                            type="button"
                            disabled={isLoading}
                            onClick={() => handleSend(reply)}
                            variants={{
                              hidden: { opacity: 0, y: 8 },
                              visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.2, ease: "easeOut" },
                              },
                            }}
                            className="focus-ring rounded-full border border-[var(--line)] px-3 py-1.5 text-[0.78rem] font-medium text-[var(--muted-ink)] transition-colors duration-150 hover:border-[var(--line-strong)] hover:text-[var(--ink)] disabled:pointer-events-none disabled:opacity-50"
                          >
                            {reply}
                          </motion.button>
                        ))}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isLoading ? (
                      <motion.div
                        key="typing-indicator"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="flex justify-start"
                      >
                        <p className="meta px-1">typing…</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                <div className="border-t border-[var(--line)] p-3">
                  <div className="flex gap-2">
                    <div className="min-w-0 flex-1">
                      <VisuallyHidden.Root>
                        <label htmlFor="chat-message">Your message</label>
                      </VisuallyHidden.Root>
                      {/* text-base on mobile: iOS Safari zooms the page for a
                          focused input under 16px and never zooms back. */}
                      <input
                        ref={inputRef}
                        id="chat-message"
                        name="message"
                        type="text"
                        autoComplete="off"
                        value={input}
                        maxLength={MAX_CHARACTERS}
                        onChange={(event) => setInput(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            handleSend();
                          }
                        }}
                        placeholder="Ask about a project"
                        disabled={isLoading}
                        className="focus-ring w-full rounded-lg border border-[var(--line)] bg-[var(--hover)] p-2 text-base text-[var(--ink)] outline-none transition-[box-shadow] duration-150 placeholder:text-[var(--dim)] disabled:opacity-50 sm:text-[0.85rem]"
                      />
                      <p className="meta tnum mt-1">
                        {input.length} / {MAX_CHARACTERS}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSend()}
                      disabled={isLoading || !input.trim()}
                      aria-label="Send message"
                      className="focus-ring h-fit rounded-lg bg-[var(--ink)] p-2 text-[var(--paper)] transition-[color,transform] duration-150 hover:opacity-90 disabled:pointer-events-none disabled:opacity-50 enabled:active:scale-[0.96]"
                    >
                      {isLoading ? (
                        <Loader2 aria-hidden="true" size={18} className="animate-spin" />
                      ) : (
                        <Send aria-hidden="true" size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default Chatbot;
