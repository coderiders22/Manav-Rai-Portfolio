"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Award, FolderGit2, Lock } from "lucide-react";
import { projectFilters, projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import { GitHubIcon } from "./icons";

type Filter = (typeof projectFilters)[number];

export function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-fg">More projects</h3>
          <p className="mt-1 text-sm text-muted">Hackathon winners, ML experiments and side builds.</p>
        </div>
        <div role="tablist" aria-label="Filter projects" className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 sm:pb-0">
          {projectFilters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "relative shrink-0 rounded-full px-3.5 py-1.5 text-sm transition-colors",
                filter === f ? "text-bg" : "text-muted hover:text-fg",
              )}
            >
              {filter === f && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-fg"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {f}
            </button>
          ))}
        </div>
      </div>

      <motion.ul layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <motion.li
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="group card relative flex flex-col p-6 transition-colors hover:border-line-strong"
            >
              <div className="flex items-start justify-between gap-3">
                {p.award ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent">
                    <Award className="size-3" />
                    {p.award}
                  </span>
                ) : (
                  <span className="grid size-8 place-items-center rounded-lg border border-line bg-surface-2 text-subtle">
                    <FolderGit2 className="size-4" />
                  </span>
                )}
                {p.github ? (
                  <ArrowUpRight className="size-4 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                ) : (
                  <Lock className="size-3.5 text-subtle" />
                )}
              </div>

              <h4 className="mt-5 text-base font-semibold tracking-tight text-fg">
                {p.github ? (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="after:absolute after:inset-0 after:rounded-[1.25rem]">
                    {p.title}
                  </a>
                ) : (
                  p.title
                )}
              </h4>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                <p className="truncate font-mono text-[11px] text-subtle">{p.stack.join(" · ")}</p>
                {p.github ? (
                  <GitHubIcon className="size-3.5 shrink-0 text-subtle" />
                ) : (
                  <span className="shrink-0 font-mono text-[11px] text-subtle">{p.private}</span>
                )}
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
