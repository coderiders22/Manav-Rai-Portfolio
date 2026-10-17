"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Briefcase, CircleCheck, Code, FolderOpen, House, Mail, MessageCircle, Rocket, Send, X } from "lucide-react";
import { featuredProjects, profile } from "@/lib/data";
import { OPEN_QUICK_CONNECT } from "@/lib/events";
import { cn } from "@/lib/utils";
import { ContactForm, type ContactPayload } from "./contact-form";

type Action = "about" | "projects" | "skills" | "contact" | "form" | "email" | "restart" | "followup";
type Option = { action: Action; label: string; icon: typeof Mail };
type Message = { id: number; from: "bot" | "user"; content: ReactNode; options?: Option[] };

const mainOptions: Option[] = [
  { action: "about", label: "Tell me about Manav", icon: Briefcase },
  { action: "projects", label: "Tell me about his projects", icon: FolderOpen },
  { action: "skills", label: "What's his tech stack?", icon: Code },
  { action: "contact", label: "I want to contact him", icon: Mail },
];
const reachOptions: Option[] = [
  { action: "form", label: "Send a message here", icon: Rocket },
  { action: "email", label: "Open Gmail with a template", icon: Mail },
];
const backOptions: Option[] = [
  { action: "contact", label: "Get in touch", icon: Mail },
  { action: "restart", label: "Back to start", icon: House },
];

function gmailUrl(subject: string, body: string) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const emailTemplate = `Hi Manav,

I came across your portfolio and would like to connect.

My name: [Your name]
Company: [Company]

What I'd like to discuss:
[A few lines about it]

Best regards,
[Your name]`;

const B = ({ children }: { children: ReactNode }) => <strong className="font-medium text-fg">{children}</strong>;

const replies: Record<"welcome" | "about" | "projects" | "skills" | "contact" | "form", ReactNode> = {
  welcome: (
    <>
      Hey there 👋 Welcome to <B>Quick Connect</B>. I can tell you about Manav&apos;s work or put you in touch with him directly.
      What brings you here?
    </>
  ),
  about: (
    <>
      Manav is a <B>GenAI &amp; full-stack engineer</B>, currently {profile.role} at {profile.company}, building
      multi-agent platforms with LangGraph, FastAPI and AWS Bedrock. Before that: Syncloop.ai, PGIMER and the Indian Air Force.
      <br />
      <br />
      Want to get in touch with him?
    </>
  ),
  projects: (
    <>
      Some highlights:
      <ul className="mt-2 space-y-1.5">
        {featuredProjects.map((p) => (
          <li key={p.slug}>
            • <B>{p.title}</B>: {p.summary.split(". ")[0].replace(/\.$/, "")}
          </li>
        ))}
        <li>
          • <B>Om Browser</B>: national finalist at the IIT BHU Dark Patterns Hackathon
        </li>
      </ul>
    </>
  ),
  skills: (
    <>
      <B>AI:</B> LangGraph, AWS Bedrock, prompt engineering, Autogen, OpenAI / Azure OpenAI, Gemini API
      <br />
      <B>Backend:</B> Python, FastAPI, Java 21 + Spring Boot, Node.js
      <br />
      <B>Frontend &amp; mobile:</B> Next.js, React, Tailwind CSS, Flutter
      <br />
      <B>Infra:</B> AWS, Docker, Jenkins, CI/CD, PostgreSQL
    </>
  ),
  contact: (
    <>
      Two quick ways to reach Manav:
      <br />
      <br />
      1. <B>Message here.</B> It reaches him right away.
      <br />
      2. <B>Email.</B> Opens a pre-filled Gmail draft to {profile.email}.
    </>
  ),
  form: <>Perfect! Fill in your details below and Manav will get back to you within 24 hours.</>,
};

export function QuickConnect() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [input, setInput] = useState("");
  const [lastSubmission, setLastSubmission] = useState<ContactPayload | null>(null);
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const push = useCallback((m: Omit<Message, "id">) => {
    setMessages((prev) => [...prev, { ...m, id: ++idRef.current }]);
  }, []);

  const botSay = useCallback(
    (content: ReactNode, options?: Option[], delay = 650) => {
      setTyping(true);
      const t = window.setTimeout(() => {
        setTyping(false);
        push({ from: "bot", content, options });
      }, delay);
      timers.current.push(t);
    },
    [push],
  );

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const started = useRef(false);
  const openChat = useCallback(() => {
    setOpen(true);
    if (!started.current) {
      started.current = true;
      botSay(replies.welcome, mainOptions, 500);
    }
  }, [botSay]);

  useEffect(() => {
    window.addEventListener(OPEN_QUICK_CONNECT, openChat);
    return () => window.removeEventListener(OPEN_QUICK_CONNECT, openChat);
  }, [openChat]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, showForm]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function handle(action: Action, label?: string) {
    // Options are single-use: strip them from earlier messages once answered.
    setMessages((prev) => prev.map((m) => (m.options ? { ...m, options: undefined } : m)));
    if (label) push({ from: "user", content: label });

    switch (action) {
      case "about":
        return botSay(replies.about, reachOptions);
      case "projects":
        return botSay(replies.projects, backOptions);
      case "skills":
        return botSay(replies.skills, backOptions);
      case "contact":
        return botSay(replies.contact, reachOptions);
      case "form":
        botSay(replies.form);
        return setShowForm(true);
      case "email":
        window.open(gmailUrl("Hello from your portfolio", emailTemplate), "_blank", "noopener");
        return botSay("Opening Gmail with a ready-to-fill template 📧", [
          { action: "form", label: "Message here instead", icon: Rocket },
          { action: "restart", label: "Back to start", icon: House },
        ]);
      case "followup":
        if (lastSubmission) {
          const { name, email, company, message } = lastSubmission;
          window.open(
            gmailUrl(
              `Follow-up: ${name}${company ? ` from ${company}` : ""}`,
              `Hi Manav,\n\nFollowing up on the message I just sent via your portfolio.\n\n--- Original message ---\n${message}\n---\n\nBest regards,\n${name}\n${email}`,
            ),
            "_blank",
            "noopener",
          );
        }
        return botSay("Gmail is open with your follow-up drafted. Anything else?", [{ action: "restart", label: "Back to start", icon: House }]);
      case "restart":
        return botSay("Sure! How can I help? 😊", mainOptions);
    }
  }

  function onFreeText(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    const t = text.toLowerCase();
    if (/(about|who|background|experience)/.test(t)) return handle("about", text);
    if (/project|built|portfolio/.test(t)) return handle("projects", text);
    if (/(skill|tech|stack|language)/.test(t)) return handle("skills", text);
    if (/(contact|email|reach|call|phone|hire|job|role|recruit)/.test(t)) return handle("contact", text);
    push({ from: "user", content: text });
    if (/^(hi|hello|hey)\b/.test(t)) return botSay("Hello! 👋 Great to have you here. What can I help with?", mainOptions);
    botSay("I'm a simple assistant, but I can point you in the right direction. Pick an option below.", mainOptions);
  }

  function onSubmitted(data: ContactPayload) {
    setLastSubmission(data);
    setShowForm(false);
    setMessages((prev) => prev.map((m) => (m.options ? { ...m, options: undefined } : m)));
    push({
      from: "bot",
      content: (
        <div className="flex items-start gap-2.5">
          <CircleCheck className="mt-0.5 size-5 shrink-0 text-success" />
          <span>
            <B>Message sent!</B> Thanks, {data.name.split(" ")[0]}. Manav will reply within 24 hours.
          </span>
        </div>
      ),
      options: [
        { action: "followup", label: "Also send a follow-up email", icon: Mail },
        { action: "restart", label: "Back to start", icon: House },
      ],
    });
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Quick Connect chat"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[5.5rem] right-4 z-[60] flex h-[min(580px,calc(100dvh-7.5rem))] w-[min(390px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-3xl border border-line-strong bg-surface shadow-2xl sm:right-6"
          >
            <header className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <span className="relative grid size-10 place-items-center rounded-full bg-fg font-serif text-lg italic text-bg">
                M
                <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-surface bg-success" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-fg">Quick Connect</p>
                <p className="text-xs text-subtle">Usually replies within a day</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="grid size-8 place-items-center rounded-full text-subtle transition-colors hover:bg-surface-2 hover:text-fg"
              >
                <X className="size-4" />
              </button>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {messages.map((m) => (
                <div key={m.id} className={cn("flex flex-col gap-2", m.from === "user" ? "items-end" : "items-start")}>
                  <div
                    className={cn(
                      "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed",
                      m.from === "user" ? "rounded-br-md bg-fg text-bg" : "rounded-bl-md border border-line bg-bg-soft text-muted",
                    )}
                  >
                    {m.content}
                  </div>
                  {m.options && (
                    <div className="flex w-full flex-col gap-1.5">
                      {m.options.map((o) => (
                        <button
                          key={o.action}
                          type="button"
                          onClick={() => handle(o.action, o.label)}
                          className="flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3 py-2 text-left text-[13px] text-fg transition-colors hover:border-accent/50 hover:bg-accent-soft"
                        >
                          <o.icon className="size-3.5 shrink-0 text-accent" />
                          {o.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {typing && (
                <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-bg-soft px-3.5 py-3" aria-label="Typing">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="size-1.5 rounded-full bg-subtle"
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-line p-3">
              {showForm ? (
                <div className="max-h-[52vh] overflow-y-auto">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-medium text-muted">Share your details</p>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        botSay("No problem! What else can I help with?", mainOptions, 300);
                      }}
                      className="inline-flex items-center gap-1 text-xs text-subtle hover:text-fg"
                    >
                      <ArrowLeft className="size-3" /> Back
                    </button>
                  </div>
                  <ContactForm compact onSuccess={onSubmitted} />
                </div>
              ) : (
                <form onSubmit={onFreeText} className="flex items-center gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about his work, projects or skills…"
                    aria-label="Message"
                    className="h-10 flex-1 rounded-full border border-line bg-bg-soft px-4 text-sm text-fg placeholder:text-subtle outline-none focus:border-accent"
                  />
                  <button type="submit" aria-label="Send" className="grid size-10 shrink-0 place-items-center rounded-full bg-fg text-bg transition-opacity hover:opacity-85">
                    <Send className="size-4" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-label={open ? "Close Quick Connect" : "Open Quick Connect"}
        aria-expanded={open}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4 }}
        className="fixed bottom-4 right-4 z-[60] flex h-14 items-center gap-2.5 rounded-full border border-line-strong bg-fg pl-4 pr-5 text-sm font-medium text-bg shadow-2xl transition-transform hover:scale-[1.03] active:scale-[0.98] sm:bottom-6 sm:right-6"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
        <span className="hidden sm:inline">{open ? "Close" : "Let's talk"}</span>
        {!open && <span className="size-2 rounded-full bg-success animate-pulse-dot" />}
      </motion.button>
    </>
  );
}
