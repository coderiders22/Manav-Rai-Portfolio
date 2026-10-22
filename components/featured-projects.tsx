import { Check, Lock } from "lucide-react";
import { featuredProjects, type FeaturedProject } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { Tag } from "./ui";

// Summary panel only — these are confidential company projects, so no
// architecture or internal workflow is shown.
function ProjectGlance({ project }: { project: FeaturedProject }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg-soft p-5 sm:p-6">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
      <div className="relative flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">At a glance</p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-[11px] font-medium text-muted">
          <span className="size-1.5 rounded-full bg-success" />
          {project.status}
        </span>
      </div>

      <div className="relative mt-6 grid grid-cols-2 gap-2.5">
        {project.metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-line bg-surface px-4 py-4">
            <p className="text-lg font-semibold tracking-tight text-fg sm:text-xl">{m.value}</p>
            <p className="mt-1 text-xs text-subtle">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="relative mt-6">
        <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">Built with</p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Tag key={s} className="bg-surface">
              {s}
            </Tag>
          ))}
        </div>
      </div>

      <p className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-xs text-subtle">
        <Lock className="size-3 shrink-0" />
        Company project. The code is private.
      </p>
    </div>
  );
}

export function FeaturedProjects() {
  return (
    <div className="space-y-6">
      {featuredProjects.map((project, i) => (
        <Reveal key={project.slug}>
          <article className="card grid gap-6 p-4 sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8">
            <div className={cn("flex flex-col py-2 sm:px-2", i % 2 === 1 && "lg:order-last")}>
              <p className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, "0")} <span className="text-subtle">/ {project.kicker}</span>
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{project.title}</h3>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-muted sm:text-base">{project.summary}</p>

              <ul className="mt-6 space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ProjectGlance project={project} />
          </article>
        </Reveal>
      ))}
    </div>
  );
}
