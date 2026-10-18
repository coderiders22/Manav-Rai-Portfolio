"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ChevronDown, Command, Download, Eye, FileText, Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { openCommandMenu } from "@/lib/events";
import { cn } from "@/lib/utils";
import { Monogram } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { buttonStyles } from "./ui";

function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);
  return active;
}

const sectionIds = navLinks.map((l) => l.id);

const menuItemClass =
  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-fg transition-colors hover:bg-surface-2 focus-visible:bg-surface-2";

function ResumeMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(buttonStyles.base, buttonStyles.primary, "h-9 px-4")}
      >
        <FileText className="size-3.5" />
        Resume
        <ChevronDown className={cn("size-3.5 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-xl border border-line-strong bg-surface p-1 shadow-card"
          >
            <a role="menuitem" href={profile.resume} target="_blank" rel="noopener" onClick={() => setOpen(false)} className={menuItemClass}>
              <Eye className="size-4 text-subtle" />
              View resume
            </a>
            <a
              role="menuitem"
              href={profile.resume}
              download={profile.resumeDownloadName}
              onClick={() => setOpen(false)}
              className={menuItemClass}
            >
              <Download className="size-4 text-subtle" />
              Download PDF
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const active = useActiveSection(sectionIds);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div style={{ scaleX: progress }} className="absolute inset-x-0 top-0 h-px origin-left bg-accent" />
      <div
        className={cn(
          "transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent",
        )}
      >
        <nav className="container-x flex h-16 items-center justify-between gap-4" aria-label="Primary">
          <a href="#top" className="flex items-center gap-2.5 rounded-lg" aria-label={`${profile.name}, home`}>
            <Monogram />
            <span className="hidden text-sm font-semibold tracking-tight sm:block">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-sm transition-colors",
                    active === link.id ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-line bg-surface-2"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCommandMenu}
              className="hidden h-9 items-center gap-2 rounded-full border border-line bg-surface/60 pl-3 pr-1.5 text-xs text-subtle transition-colors hover:border-line-strong hover:text-fg lg:flex"
              aria-label="Open command menu"
            >
              Quick search
              <kbd className="flex items-center gap-0.5 rounded-full border border-line bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-muted">
                {isMac ? <Command className="size-2.5" /> : "Ctrl "}K
              </kbd>
            </button>
            <ThemeToggle />
            <ResumeMenu />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={cn(buttonStyles.base, buttonStyles.icon, "size-9 md:hidden")}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-b border-line bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 text-base text-fg hover:bg-surface-2"
                  >
                    {link.label}
                    <span className="font-mono text-xs text-subtle">#{link.id}</span>
                  </a>
                </li>
              ))}
              <li className="mt-2 grid grid-cols-2 gap-2">
                <a href={profile.resume} target="_blank" rel="noopener" className={cn(buttonStyles.base, buttonStyles.secondary)}>
                  View resume
                </a>
                <a href={profile.resume} download={profile.resumeDownloadName} className={cn(buttonStyles.base, buttonStyles.primary)}>
                  <Download className="size-4" /> Download
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
