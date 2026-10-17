import { ArrowUpRight, MapPin } from "lucide-react";
import { experience } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { RichText, SectionHeading, Serif, Tag } from "./ui";

export function Experience() {
  return (
    <section id="experience" className="relative border-y border-line bg-bg-soft py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          index="02"
          eyebrow="Experience"
          title={
            <>
              Five roles, one habit: <Serif>ship real software.</Serif>
            </>
          }
          description="From enterprise GenAI platforms to a patient-facing healthcare app and a defense diagnostics tool."
        />

        <ol className="relative">
          {experience.map((job, i) => (
            <li key={`${job.company}-${job.period}`} className="relative grid gap-4 pb-12 last:pb-0 md:grid-cols-[200px_1fr] md:gap-10">
              {/* timeline rail */}
              <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-2 w-px bg-line md:left-[205px]" />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-1.5 size-[11px] rounded-full border-2 md:left-[200px]",
                  job.current ? "border-success bg-success animate-pulse-dot" : "border-line-strong bg-bg-soft",
                )}
              />

              <Reveal className="pl-7 md:pl-0">
                <p className="font-mono text-xs uppercase tracking-wider text-subtle">{job.period}</p>
                {job.current && (
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success">
                    Current role
                  </span>
                )}
              </Reveal>

              <Reveal delay={0.05} className="pl-7 md:pl-0">
                <div className={cn("card p-6 sm:p-7", i === 0 && "border-line-strong")}>
                  <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-fg">{job.role}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {job.companyUrl ? (
                          <a
                            href={job.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1 font-medium text-fg hover:text-accent"
                          >
                            {job.company}
                            <ArrowUpRight className="size-3.5 opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                          </a>
                        ) : (
                          <span className="font-medium text-fg">{job.company}</span>
                        )}
                        {job.org && <span className="text-subtle"> · {job.org}</span>}
                      </p>
                    </div>
                    {job.location && (
                      <p className="inline-flex items-center gap-1 text-xs text-subtle">
                        <MapPin className="size-3" />
                        {job.location}
                      </p>
                    )}
                  </div>

                  <ul className="mt-5 space-y-3">
                    {job.points.map((point) => (
                      <li key={point} className="relative pl-5 text-[15px] leading-relaxed text-muted">
                        <span aria-hidden="true" className="absolute left-0.5 top-[0.62em] size-1.5 rounded-full bg-accent" />
                        <RichText text={point} />
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {job.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
