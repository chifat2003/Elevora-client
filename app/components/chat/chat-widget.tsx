"use client";

import { useEffect, useRef, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { fetchChatHistory, streamChat } from "@/app/lib/api";

const FOLLOW_UPS_SEEKER = [
  "Find me remote engineering jobs",
  "How do I apply to a job?",
  "What's the difference between saving and applying?",
];
const FOLLOW_UPS_RECRUITER = [
  "How do I post a job?",
  "Where do I manage my postings?",
  "Can AI help write my job description?",
];

type DisplayMessage = { role: "user" | "assistant"; content: string };

export function ChatWidget() {
  const { data: session } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const userId = session?.user.id;
  const role = (session?.user as { role?: string } | undefined)?.role;
  const followUps = role === "recruiter" ? FOLLOW_UPS_RECRUITER : FOLLOW_UPS_SEEKER;

  useEffect(() => {
    if (!open || !userId || historyLoaded) return;
    fetchChatHistory(userId)
      .then((history) => {
        setMessages(history.map((m) => ({ role: m.role, content: m.content })));
        setHistoryLoaded(true);
      })
      .catch(() => setHistoryLoaded(true));
  }, [open, userId, historyLoaded]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, streamingText, open]);

  const send = async (text: string) => {
    if (!userId || !text.trim() || streaming) return;
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setStreaming(true);
    setStreamingText("");
    try {
      let full = "";
      await streamChat(userId, text, (delta) => {
        full += delta;
        setStreamingText(full);
      });
      setMessages((prev) => [...prev, { role: "assistant", content: full }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setStreaming(false);
      setStreamingText("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  if (!session) return null;

  const lastMessage = messages[messages.length - 1];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="mb-3 flex h-[28rem] w-80 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-900 sm:w-96">
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              Elevora Assistant
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              ✕
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.length === 0 && !streaming && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Ask me about jobs, applications, or how to use Elevora.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-white"
                    : "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
                }`}
              >
                {m.content}
              </div>
            ))}
            {streaming && (
              <div className="max-w-[85%] rounded-lg bg-neutral-100 px-3 py-2 text-sm whitespace-pre-wrap text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
                {streamingText || (
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" />
                  </span>
                )}
              </div>
            )}
            {error && <p className="text-xs text-red-600">{error}</p>}

            {!streaming && lastMessage?.role === "assistant" && (
              <div className="flex flex-wrap gap-2 pt-1">
                {followUps.map((f) => (
                  <button
                    key={f}
                    onClick={() => send(f)}
                    className="rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-600 hover:border-primary hover:text-primary dark:border-neutral-700 dark:text-neutral-400"
                  >
                    {f}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-neutral-200 p-3 dark:border-neutral-700"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something…"
              className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-primary dark:border-neutral-700 dark:bg-neutral-900"
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle chat assistant"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark"
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
