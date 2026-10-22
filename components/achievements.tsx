import { ArrowUpRight, Flag, GraduationCap, Medal, ScrollText, Trophy } from "lucide-react";
import { achievements, education } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading, Serif } from "./ui";

const icons = { trophy: Trophy, medal: Medal, flag: Flag, scroll: ScrollText } as const;

export function Achievements() {
  return (
    <section id="achievements" className="container-x py-20 sm:py-28">
      <SectionHeading
        index="05"
        eyebrow="Recognition"
        title={
          <>
            Awards, honours &amp; <Serif>education.</Serif>
          </>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((a, i) => {
          const Icon = icons[a.icon];
          return (
            <Reveal key={a.title} delay={i * 0.06} className="card flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="size-[18px]" />
                </span>
                {a.year && <span className="font-mono text-xs text-subtle">{a.year}</span>}
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-tight text-fg">{a.title}</h3>
              <p className="mt-1 text-sm font-medium text-fg/85">{a.event}</p>
              <p className="text-sm text-subtle">{a.org}</p>
              <p className="mt-4 flex-1 border-t border-line pt-4 text-[13px] leading-relaxed text-muted">{a.note}</p>
              <a
                href={a.certificate}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex items-center gap-1 self-start text-xs font-medium text-accent hover:text-accent-strong"
              >
                View certificate
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="card mt-4 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div className="flex items-center gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
            <GraduationCap className="size-5" />
          </span>
          <div>
            <h3 className="text-base font-semibold tracking-tight text-fg sm:text-lg">{education.degree}</h3>
            <p className="text-sm text-muted">{education.school}</p>
          </div>
        </div>
        <p className="font-mono text-xs uppercase tracking-wider text-subtle sm:text-right">{education.period}</p>
      </Reveal>
    </section>
  );
}
