"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import {
  Menu,
  RotateCcw,
  Minus,
  Send,
  Phone,
  History,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  ChevronRight,
  Compass,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface SourceItem {
  title: string;
  url?: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
  sources?: SourceItem[];
}

/* ─── Initial Quick-start suggestions ────────────────────────────────────── */
const INITIAL_SUGGESTIONS = [
  "What services does ABWcurious offer?",
  "Tell me about mobile app development",
  "How can AI help my business?",
  "What is your pricing and timeline?",
  "Tell me about training pathways",
  "Where are you located in Nerul Navi Mumbai?",
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I'm **Aria**, your AI assistant for **ABWcurious**.\n\nI can help you explore our services, products, training pathways, pricing models, and engineering processes. How can I assist you today?",
  timestamp: new Date(),
  suggestions: INITIAL_SUGGESTIONS,
  sources: [
    { title: "Explore Services", url: "#/services" },
    { title: "Training for What's Next", url: "/training" },
  ],
};

function formatTime(d: Date): string {
  try {
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true });
  } catch {
    return "";
  }
}

/* ─── Thinking Indicator ─────────────────────────────────────────────────── */
function ThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-2.5 py-2 px-1 text-sm text-neutral-600 italic"
    >
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-1.5 w-1.5 rounded-full bg-ibm-blue"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
      <span>Thinking...</span>
    </motion.div>
  );
}

/* ─── Message Bubble ─────────────────────────────────────────────────────── */
function MessageBubble({
  message,
  onSuggestionClick,
}: {
  message: Message;
  onSuggestionClick: (text: string) => void;
}) {
  const isUser = message.role === "user";
  const timeStr = formatTime(message.timestamp);

  if (isUser) {
    return (
      <div className="flex flex-col items-end gap-1 my-1">
        <span className="text-[11px] text-neutral-500 font-normal pr-1">
          You {timeStr}
        </span>
        <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-[#e2e2e4] text-neutral-900 px-4 py-2.5 text-sm leading-relaxed shadow-2xs">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  // Assistant Message
  return (
    <div className="flex flex-col items-start gap-1 my-2">
      <span className="text-[11px] text-neutral-500 font-normal pl-1">
        Aria {timeStr}
      </span>
      <div className="max-w-[94%] rounded-2xl rounded-tl-xs bg-white text-neutral-900 px-4 py-3 text-sm leading-relaxed border border-neutral-200 shadow-2xs">
        {/* Answer Content */}
        <div className="prose prose-sm prose-slate max-w-none [&>p]:mb-2 [&>ul]:mb-2 [&>ul]:pl-4 [&>ol]:mb-2 [&>ol]:pl-4 [&_strong]:font-semibold [&_h3]:font-semibold [&_h3]:text-sm [&_h3]:mt-2.5 [&_h3]:mb-1 [&_a]:text-ibm-blue [&_a]:underline hover:[&_a]:text-ibm-cyan">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>

        {/* ── Prominent Page Links at the bottom of the answer ── */}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-3.5 pt-2.5 border-t border-neutral-200 flex flex-col gap-1.5">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
              <Compass className="h-3 w-3 text-ibm-blue" />
              Related Page:
            </span>
            <div className="flex flex-col gap-1.5">
              {message.sources.map((src, i) => (
                <a
                  key={i}
                  href={src.url || "#"}
                  className="group/link flex items-center justify-between rounded-lg bg-blue-50/90 hover:bg-blue-100 text-ibm-blue border border-blue-200/90 px-3 py-2 text-xs font-semibold transition-all"
                >
                  <span className="truncate">{src.title}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Suggested Follow-up chips */}
      {message.suggestions && message.suggestions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1.5 pl-1">
          {message.suggestions.slice(0, 3).map((s) => (
            <button
              key={s}
              onClick={() => onSuggestionClick(s)}
              className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 hover:border-ibm-blue px-3 py-1 text-xs font-medium text-neutral-800 transition-colors cursor-pointer"
            >
              <Sparkles className="h-2.5 w-2.5 text-ibm-blue" />
              <span>{s}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main ChatAssistant Component ───────────────────────────────────────── */
export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Auto-scroll */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /* Focus input on open */
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 250);
    } else {
      setShowMenu(false);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const userMsg = text.trim();
      if (!userMsg || isLoading) return;

      setInput("");
      setShowMenu(false);

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: userMsg,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch response");
        }

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
          suggestions: data.suggestions || [],
          sources: data.sources || [],
        };

        setMessages((prev) => [...prev, assistantMessage]);
        if (!isOpen) setUnreadCount((c) => c + 1);
      } catch (err) {
        console.error("Chat error:", err);
        const errorMsg: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I'm here to assist you! You can reach our engineering team directly at [info@abwcurious.com](mailto:info@abwcurious.com) or call [+91 99303 38504](tel:+919930338504). What would you like to know?",
          timestamp: new Date(),
          sources: [{ title: "Contact ABWcurious", url: "#/contact" }],
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, isOpen]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setInput("");
    setShowMenu(false);
  };

  return (
    <>
      {/* ─── Floating Trigger Button: BLUE THEME, NO GREEN DOT, POSITIONED ABOVE GO TOP ─── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open AI Assistant"
            title="Chat with ABWcurious AI"
            className="fixed bottom-[88px] right-6 z-50 flex h-13 w-13 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#0f62fe] hover:bg-[#0043ce] text-white shadow-xl shadow-blue-600/35 ring-4 ring-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            {/* Clean Message Icon */}
            <MessageSquare className="h-6 w-6 stroke-[1.9]" />

            {/* Unread numeric badge only (Green dot completely removed) */}
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Chat Window ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-[9999] flex flex-col w-[380px] sm:w-[420px] h-[580px] sm:h-[620px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] overflow-hidden rounded-xl border border-neutral-300 bg-white shadow-2xl shadow-black/25"
            role="dialog"
            aria-label="ABWcurious AI Chat"
          >
            {/* ── 1. Top Header Bar ── */}
            <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-4 py-3">
              {/* Left: Hamburger menu */}
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                title="Menu options"
                aria-label="Menu"
                className="flex h-8 w-8 items-center justify-center rounded-md text-neutral-800 hover:bg-neutral-100 transition cursor-pointer"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Center/Right: AI Badge, Rotate icon, Minimize icon */}
              <div className="flex items-center gap-3.5">
                <div className="border border-neutral-900 rounded px-1.5 py-0.5 text-xs font-mono font-bold tracking-wider text-neutral-900">
                  AI
                </div>

                <button
                  onClick={resetChat}
                  title="Restart conversation"
                  aria-label="Restart conversation"
                  className="text-neutral-700 hover:text-neutral-950 transition cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize chat"
                  aria-label="Minimize"
                  className="text-neutral-700 hover:text-neutral-950 transition cursor-pointer"
                >
                  <Minus className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Slide-down Menu */}
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-xs"
                >
                  <p className="font-semibold text-neutral-700 uppercase tracking-wider text-[10px]">
                    Quick Navigation
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => sendMessage("What services do you offer?")}
                      className="text-left text-neutral-800 hover:text-ibm-blue py-1 flex items-center justify-between"
                    >
                      <span>Services</span>
                      <ChevronRight className="h-3 w-3 text-neutral-400" />
                    </button>
                    <button
                      onClick={() => sendMessage("Tell me about your products like IntelliQR")}
                      className="text-left text-neutral-800 hover:text-ibm-blue py-1 flex items-center justify-between"
                    >
                      <span>Products</span>
                      <ChevronRight className="h-3 w-3 text-neutral-400" />
                    </button>
                    <button
                      onClick={() => sendMessage("Tell me about training pathways for what's next")}
                      className="text-left text-neutral-800 hover:text-ibm-blue py-1 flex items-center justify-between"
                    >
                      <span>Training</span>
                      <ChevronRight className="h-3 w-3 text-neutral-400" />
                    </button>
                    <button
                      onClick={() => sendMessage("What is your pricing model?")}
                      className="text-left text-neutral-800 hover:text-ibm-blue py-1 flex items-center justify-between"
                    >
                      <span>Pricing</span>
                      <ChevronRight className="h-3 w-3 text-neutral-400" />
                    </button>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-neutral-200 flex items-center justify-between text-neutral-500">
                    <span>Nerul, Navi Mumbai, India</span>
                    <a href="tel:+919930338504" className="text-ibm-blue font-medium">
                      +91 99303 38504
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── 2. Message History Area ── */}
            <div className="flex flex-1 flex-col overflow-y-auto px-4 py-4 bg-white scroll-smooth">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  onSuggestionClick={(s) => sendMessage(s)}
                />
              ))}

              {/* Thinking Indicator */}
              {isLoading && <ThinkingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* ── 3. Privacy Statement Disclaimer ── */}
            <div className="shrink-0 border-t border-neutral-200 bg-white px-4 py-2.5 text-[11px] leading-relaxed text-neutral-500 font-sans">
              By proceeding, you agree that ABWcurious can process personal information
              about our conversation, including a text/transcript recording to allow us to
              respond to your inquiry. Please see{" "}
              <a
                href="#/privacy"
                target="_blank"
                rel="noreferrer"
                className="text-ibm-blue underline hover:text-ibm-blue/80"
              >
                ABWcurious&apos;s Privacy Statement
              </a>{" "}
              to learn about how ABWcurious processes personal information.
            </div>

            {/* ── 4. Bottom Blue Action Bar ── */}
            <div className="shrink-0 bg-[#0f62fe] px-3.5 py-3">
              <div className="flex items-center gap-2">
                {/* White pill text input box with send icon inside */}
                <div className="flex flex-1 items-center rounded-full bg-white px-3.5 py-1.5 shadow-sm focus-within:ring-2 focus-within:ring-white/80 transition">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    disabled={isLoading}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={isLoading ? "Please wait..." : "Ask a question..."}
                    className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                    aria-label="Chat query input"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={!input.trim() || isLoading}
                    aria-label="Send message"
                    className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-500 hover:text-ibm-blue disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>

                {/* Phone Call Icon Button on Blue Background */}
                <a
                  href="tel:+919930338504"
                  title="Call ABWcurious (+91 99303 38504)"
                  aria-label="Call ABWcurious"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/15 active:scale-95 transition cursor-pointer"
                >
                  <Phone className="h-4 w-4" />
                </a>

                {/* History / Reset Icon Button on Blue Background */}
                <button
                  onClick={resetChat}
                  title="Clear chat history"
                  aria-label="Reset chat history"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/15 active:scale-95 transition cursor-pointer"
                >
                  <History className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
