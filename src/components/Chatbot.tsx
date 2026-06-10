'use client'
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; content: string }[]>([
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
      setMessages(prev => [...prev, { role: 'bot', content: `Error: ${message}` }]);
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
        title={isOpen ? "Close assistant" : "Ask about my work"}
        className="fixed bottom-6 right-6 z-50 p-4 bg-slate-950 text-white rounded-full shadow-lg hover:bg-slate-800 transition-all duration-300 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] max-h-[500px] h-[70vh] bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl flex flex-col border border-slate-200 dark:border-zinc-800 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-white dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src="/img/pic2.jpeg"
                    alt="John Carl Santos"
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-gray-100">Chat with John Carl</p>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium">● Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-80 text-slate-900 dark:text-gray-100">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-white dark:bg-zinc-900">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {msg.role === 'user' ? (
                      <div className="p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 bg-slate-100 text-slate-600 dark:bg-zinc-800 dark:text-zinc-300">
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
                    <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-slate-950 text-white' : 'bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-gray-200'}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Replies */}
              {showQuickReplies && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSend(reply)}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-950 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

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
                    <div className="p-3 rounded-2xl text-sm bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-gray-200">
                      <Loader2 size={16} className="animate-spin text-slate-500 dark:text-zinc-400" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900">
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
                    className="w-full p-2 bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-slate-400 outline-none text-slate-800 dark:text-gray-200"
                  />
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">{input.length} / {MAX_CHARACTERS}</p>
                </div>
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="p-2 bg-slate-950 text-white rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                >
                  <Send size={18} />
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
