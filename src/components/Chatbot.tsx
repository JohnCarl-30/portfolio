'use client'
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageCircle, X, Send, User, Loader2 } from 'lucide-react';
import Image from 'next/image';

type ChatApiResponse = {
  reply?: string | null;
  error?: string;
  source?: "openai" | "fallback";
};

const quickReplies = [
  "What projects should I see first?",
  "What AI work have you built?",
  "How can I contact John Carl?",
];

const parseApiResponse = async (response: Response): Promise<ChatApiResponse> => {
  const rawBody = await response.text();
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return JSON.parse(rawBody) as ChatApiResponse;
  }

  try {
    return JSON.parse(rawBody) as ChatApiResponse;
  } catch {
    const cleanedBody = rawBody
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160);

    throw new Error(
      cleanedBody
        ? `Server returned an invalid response: ${cleanedBody}`
        : 'Server returned an invalid response.',
    );
  }
};

type ChatMessage = {
  role: 'user' | 'bot';
  content: string;
  isError?: boolean;
};

const Chatbot = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', content: "Hi, I'm John Carl's portfolio assistant. Ask me about his AI work, project stack, experience, or the best way to contact him." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const MAX_CHARACTERS = 1000;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text?: string) => {
    const messageText = text?.trim() || input.trim();
    if (!messageText || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: messageText }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await parseApiResponse(response);
      if (!response.ok || data.error) {
        throw new Error(data.error || "I'm having trouble connecting.");
      }
      
      setMessages(prev => [...prev, { role: 'bot', content: data.reply || "I don't have a response yet." }]);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "I'm having trouble connecting.";
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'bot', content: message, isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const showQuickReplies = messages.length === 1 && messages[0].role === 'bot';

  return (
    <>
      {/* Floating Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close portfolio assistant" : "Open portfolio assistant"}
        aria-expanded={isOpen}
        title={isOpen ? "Close assistant" : "Ask about my work"}
        className="focus-ring fixed bottom-6 right-6 z-50 cursor-pointer rounded-full bg-primary p-4 text-primary-foreground shadow-lg transition-[box-shadow,transform] duration-150 hover:shadow-xl active:scale-[0.98]"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 20, scale: 0.95 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-24 right-6 z-50 flex h-[70vh] max-h-[500px] w-[calc(100vw-3rem)] max-w-[350px] flex-col overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-popover p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src="/img/pic2.jpeg"
                    alt="John Carl Santos"
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 object-cover"
                  />
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-popover bg-green-500"></div>
                </div>
                <div>
                  <p className="font-semibold text-popover-foreground">Chat with John Carl</p>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">● Online</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="focus-ring cursor-pointer rounded-lg p-1 text-popover-foreground transition-colors duration-150 hover:bg-accent"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-popover p-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {msg.role === 'user' ? (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent p-2 text-accent-foreground">
                        <User size={16} />
                      </div>
                    ) : (
                      <Image
                        src="/img/pic2.jpeg"
                        alt="Bot"
                        width={32}
                        height={32}
                        className="rounded-full w-8 h-8 object-cover"
                      />
                    )}
                    <div
                      className={`rounded-2xl p-3 text-sm ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : msg.isError
                            ? 'border border-destructive/30 bg-destructive/5 text-foreground'
                            : 'bg-accent text-accent-foreground'
                      }`}
                    >
                      {msg.isError ? (
                        <>
                          <p className="font-medium">Could not get a reply</p>
                          <p className="mt-1 text-muted-foreground">{msg.content}</p>
                        </>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Replies */}
              <AnimatePresence>
                {showQuickReplies && (
                  <motion.div
                    key="quick-replies"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.06 } },
                    }}
                    className="flex flex-wrap gap-2 pt-2"
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
                        className="focus-ring cursor-pointer rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:border-primary/40 hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                      >
                        {reply}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <Image
                      src="/img/pic2.jpeg"
                      alt="Bot"
                      width={32}
                      height={32}
                      className="rounded-full w-8 h-8 object-cover"
                    />
                    <div className="rounded-2xl bg-accent p-3 text-sm text-accent-foreground">
                      <Loader2 size={16} className="animate-spin text-muted-foreground" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border bg-popover p-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_CHARACTERS) {
                        setInput(e.target.value);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        void handleSend();
                      }
                    }}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="w-full rounded-lg border-none bg-accent p-2 text-sm text-foreground outline-none transition-[box-shadow] duration-150 focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">{input.length} / {MAX_CHARACTERS}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  className="focus-ring h-fit cursor-pointer rounded-lg bg-primary p-2 text-primary-foreground transition-transform duration-150 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
