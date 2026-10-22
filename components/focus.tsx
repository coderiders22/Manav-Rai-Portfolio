import { Bot, Layers, Server } from "lucide-react";
import { pillars } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading, Serif, Tag } from "./ui";

const icons = { bot: Bot, server: Server, layers: Layers } as const;

export function Focus() {
  return (
    <section id="about" className="container-x pb-20 pt-12 sm:pb-28 sm:pt-16">
      <SectionHeading
        index="01"
        eyebrow="What I do"
        title={
          <>
            AI, backend and <Serif>full-stack apps.</Serif>
          </>
        }
        description="I like taking an idea from start to finish: planning it, building the backend and the screens, testing it and putting it live."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {pillars.map((p, i) => {
          const Icon = icons[p.icon];
          return (
            <Reveal key={p.title} delay={i * 0.08} className="group card relative overflow-hidden p-6 sm:p-7">
              <div
                aria-hidden="true"
                className="absolute -right-16 -top-16 size-40 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span className="grid size-11 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-fg">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {p.tools.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
