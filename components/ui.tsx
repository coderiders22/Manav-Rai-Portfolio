import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("mb-12 max-w-2xl sm:mb-16", className)}>
      <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-subtle">
        <span className="text-accent">{index}</span>
        <span className="size-1 rounded-full bg-line-strong" />
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {description && <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </Reveal>
  );
}

export function Serif({ children }: { children: ReactNode }) {
  return <span className="font-serif font-normal italic tracking-normal text-accent">{children}</span>;
}

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-line bg-surface-2/60 px-2 py-0.5 font-mono text-[11px] leading-5 text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Renders `**bold**` segments from content strings as emphasised text. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-medium text-fg">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export const buttonStyles = {
  base: "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
  primary: "bg-fg px-5 py-2.5 text-bg hover:bg-fg/85",
  secondary: "border border-line-strong bg-surface/60 px-5 py-2.5 text-fg backdrop-blur hover:border-fg/30 hover:bg-surface-2",
  ghost: "px-3 py-2 text-muted hover:bg-surface-2 hover:text-fg",
  icon: "size-10 border border-line bg-surface/60 text-muted hover:border-line-strong hover:text-fg",
};
