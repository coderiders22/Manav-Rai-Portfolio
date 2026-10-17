"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType, type SVGProps } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import {
  Award,
  Briefcase,
  Check,
  Code,
  CornerDownLeft,
  Download,
  FileText,
  FolderOpen,
  House,
  Mail,
  MessageCircle,
  Moon,
  Search,
  Sparkles,
} from "lucide-react";
import { profile } from "@/lib/data";
import { OPEN_COMMAND_MENU, openQuickConnect } from "@/lib/events";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon } from "./icons";

type Item = {
  id: string;
  label: string;
  group: "Navigate" | "Actions" | "Elsewhere";
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  hint?: string;
  keywords?: string;
  run: () => void;
};

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", id === "top" ? location.pathname : `#${id}`);
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const { resolvedTheme, setTheme } = useTheme();

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2000);
  }, []);

  const items = useMemo<Item[]>(
    () => [
      { id: "home", label: "Home", group: "Navigate", icon: House, run: () => goTo("top") },
      { id: "about", label: "What I do", group: "Navigate", icon: Sparkles, keywords: "about focus", run: () => goTo("about") },
      { id: "experience", label: "Experience", group: "Navigate", icon: Briefcase, keywords: "work jobs career", run: () => goTo("experience") },
      { id: "projects", label: "Projects", group: "Navigate", icon: FolderOpen, keywords: "work portfolio case studies", run: () => goTo("projects") },
      { id: "skills", label: "Skills", group: "Navigate", icon: Code, keywords: "stack tech toolkit", run: () => goTo("skills") },
      { id: "achievements", label: "Achievements & education", group: "Navigate", icon: Award, keywords: "awards hackathon degree", run: () => goTo("achievements") },
      { id: "contact", label: "Contact", group: "Navigate", icon: Mail, keywords: "reach message talk", run: () => goTo("contact") },
      {
        id: "download",
        label: "Download résumé",
        group: "Actions",
        icon: Download,
        hint: "PDF",
        keywords: "cv resume",
        run: () => {
          const a = document.createElement("a");
          a.href = profile.resume;
          a.download = profile.resumeDownloadName;
          a.click();
        },
      },
      { id: "view", label: "View résumé", group: "Actions", icon: FileText, keywords: "cv resume open", run: () => window.open(profile.resume, "_blank", "noopener") },
      {
        id: "copy",
        label: "Copy email address",
        group: "Actions",
        icon: Check,
        hint: profile.email,
        keywords: "email clipboard",
        run: () => {
          navigator.clipboard.writeText(profile.email).then(
            () => showToast("Email copied to clipboard"),
            () => (window.location.href = `mailto:${profile.email}`),
          );
        },
      },
      { id: "email", label: "Send an email", group: "Actions", icon: Mail, keywords: "mail contact", run: () => (window.location.href = `mailto:${profile.email}`) },
      { id: "chat", label: "Open Quick Connect", group: "Actions", icon: MessageCircle, keywords: "chat message talk", run: openQuickConnect },
      {
        id: "theme",
        label: resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        group: "Actions",
        icon: Moon,
        keywords: "theme dark light mode",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      { id: "github", label: "GitHub", group: "Elsewhere", icon: GitHubIcon, hint: `@${profile.socials.githubHandle}`, run: () => window.open(profile.socials.github, "_blank", "noopener") },
      { id: "linkedin", label: "LinkedIn", group: "Elsewhere", icon: LinkedInIcon, hint: `in/${profile.socials.linkedinHandle}`, run: () => window.open(profile.socials.linkedin, "_blank", "noopener") },
    ],
    [resolvedTheme, setTheme, showToast],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.keywords ?? ""} ${i.group}`.toLowerCase().includes(q));
  }, [items, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    restoreFocus.current?.focus();
  }, []);

  const openMenu = useCallback(() => {
    restoreFocus.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else openMenu();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_COMMAND_MENU, openMenu);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_COMMAND_MENU, openMenu);
    };
  }, [open, close, openMenu]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function run(item: Item) {
    close();
    // Let the dialog unmount before scrolling or opening tabs.
    requestAnimationFrame(() => item.run());
  }

  function onInputKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter" && filtered[active]) {
      e.preventDefault();
      run(filtered[active]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  }

  let lastGroup = "";

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} aria-hidden="true" />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search className="size-4 shrink-0 text-subtle" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onInputKey}
                  placeholder="Jump to a section, grab the résumé…"
                  className="h-14 flex-1 bg-transparent text-[15px] text-fg placeholder:text-subtle outline-none"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="command-list"
                  aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
                />
                <kbd className="rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-subtle">ESC</kbd>
              </div>

              <ul ref={listRef} id="command-list" role="listbox" className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
                {filtered.length === 0 && <li className="px-3 py-10 text-center text-sm text-subtle">No results for “{query}”.</li>}
                {filtered.map((item, i) => {
                  const showGroup = item.group !== lastGroup;
                  lastGroup = item.group;
                  const Icon = item.icon;
                  return (
                    <li key={item.id} role="presentation">
                      {showGroup && <p className="px-3 pb-1.5 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">{item.group}</p>}
                      <button
                        id={`cmd-${item.id}`}
                        role="option"
                        aria-selected={i === active}
                        data-index={i}
                        onMouseMove={() => setActive(i)}
                        onClick={() => run(item)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                          i === active ? "bg-surface-2 text-fg" : "text-muted",
                        )}
                      >
                        <Icon className="size-4 shrink-0" />
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.hint && <span className="hidden truncate font-mono text-[11px] text-subtle sm:block">{item.hint}</span>}
                        {i === active && <CornerDownLeft className="size-3.5 shrink-0 text-subtle" />}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10px] text-subtle">
                <span>↑↓ navigate · ↵ select</span>
                <span>{profile.name}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full border border-line-strong bg-surface px-4 py-2 text-sm text-fg shadow-card"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
