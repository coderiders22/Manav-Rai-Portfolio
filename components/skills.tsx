import { Bot, Cloud, Code, Database, LayoutTemplate, Server } from "lucide-react";
import { skillGroups } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading, Serif } from "./ui";

const icons = {
  bot: Bot,
  code: Code,
  server: Server,
  layout: LayoutTemplate,
  cloud: Cloud,
  database: Database,
} as const;

export function Skills() {
  return (
    <section id="skills" className="border-y border-line bg-bg-soft py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="Toolkit"
          title={
            <>
              Tools I <Serif>work with.</Serif>
            </>
          }
          description="Languages, frameworks and tools I use in my day-to-day work."
        />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon];
            return (
              <Reveal key={group.title} delay={(i % 3) * 0.06} className="bg-bg-soft p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <Icon className="size-4 text-accent" />
                  <h3 className="text-sm font-semibold tracking-tight text-fg">{group.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-surface px-2.5 py-1 text-[13px] text-muted transition-colors hover:border-line-strong hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
