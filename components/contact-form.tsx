"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CircleCheck, LoaderCircle } from "lucide-react";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { buttonStyles } from "./ui";

export type ContactPayload = { name: string; email: string; company: string; message: string };

type Status = { state: "idle" | "sending" | "success" } | { state: "error"; message: string };

const fieldClass =
  "w-full rounded-xl border border-line bg-bg-soft px-3.5 text-sm text-fg placeholder:text-subtle outline-none transition-[border-color,box-shadow] focus:border-accent focus:ring-4 focus:ring-accent-soft";

function Field({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-xs font-medium text-muted">
        {label}
        {optional && <span className="font-normal text-subtle">Optional</span>}
      </span>
      {children}
    </label>
  );
}

export function ContactForm({
  compact = false,
  onSuccess,
}: {
  compact?: boolean;
  onSuccess?: (data: ContactPayload) => void;
}) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [sentName, setSentName] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: ContactPayload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
    };

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, website: fd.get("website") }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setSentName(payload.name.split(" ")[0]);
      setStatus({ state: "success" });
      onSuccess?.(payload);
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  if (status.state === "success" && !compact) {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-line bg-bg-soft p-8 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-success/10 text-success">
          <CircleCheck className="size-7" />
        </span>
        <h3 className="mt-5 text-lg font-semibold tracking-tight text-fg">Thanks{sentName ? `, ${sentName}` : ""}! Message received.</h3>
        <p className="mt-2 max-w-xs text-sm text-muted">I&apos;ll get back to you within 24 hours, usually sooner.</p>
        <button type="button" onClick={() => setStatus({ state: "idle" })} className={cn(buttonStyles.base, buttonStyles.ghost, "mt-6")}>
          Send another message
        </button>
      </div>
    );
  }

  const inputHeight = compact ? "h-10" : "h-11";

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-4", compact && "space-y-2.5")}>
      <div className={cn("grid gap-4", compact ? "grid-cols-2 gap-2.5" : "sm:grid-cols-2")}>
        <Field label="Name">
          <input name="name" required maxLength={100} autoComplete="name" placeholder="Jane Doe" className={cn(fieldClass, inputHeight)} />
        </Field>
        <Field label="Email">
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="jane@company.com"
            className={cn(fieldClass, inputHeight)}
          />
        </Field>
      </div>
      <Field label="Company" optional>
        <input name="company" maxLength={120} autoComplete="organization" placeholder="Company or team" className={cn(fieldClass, inputHeight)} />
      </Field>
      <Field label="Message">
        <textarea
          name="message"
          required
          maxLength={4000}
          rows={compact ? 3 : 5}
          placeholder="Tell me about the role or project…"
          className={cn(fieldClass, "resize-none py-3 leading-relaxed")}
        />
      </Field>

      {/* Honeypot for bots — hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.state === "error" && (
        <p role="alert" className="rounded-xl border border-red-500/25 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-500 dark:text-red-400">
          {status.message}{" "}
          <a href={`mailto:${profile.email}`} className="font-medium underline underline-offset-2">
            {profile.email}
          </a>
        </p>
      )}

      <div className={cn("flex flex-wrap items-center justify-between gap-3", compact ? "pt-0.5" : "pt-1")}>
        <button
          type="submit"
          disabled={status.state === "sending"}
          className={cn(buttonStyles.base, buttonStyles.primary, compact ? "h-10 w-full" : "h-11 px-6")}
        >
          {status.state === "sending" ? (
            <>
              <LoaderCircle className="size-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send message <ArrowRight className="size-4" />
            </>
          )}
        </button>
        {!compact && <p className="text-xs text-subtle">Shared only with me, never with third parties.</p>}
      </div>
    </form>
  );
}
