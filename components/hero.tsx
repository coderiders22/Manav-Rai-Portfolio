import Image from "next/image";
import { Briefcase, Download, GraduationCap, Mail, MapPin } from "lucide-react";
import { education, profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Reveal } from "./reveal";
import { Stats } from "./stats";
import { Serif, buttonStyles } from "./ui";

export function Hero() {
  return (
    <section id="top" className="relative isolate pt-28 sm:pt-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid mask-fade-y opacity-70" />
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <div>
          <Reveal>
            <p className="text-base font-medium text-muted sm:text-lg">
              Hi, I&apos;m <span className="text-fg">{profile.name}</span>, an AI engineer from India.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-3 text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] text-fg sm:text-6xl lg:text-[4.25rem]">
              I build AI products <Serif>that solve real problems.</Serif>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">{profile.summary}</p>
          </Reveal>

          <Reveal delay={0.2} className="mt-9 flex flex-wrap items-center gap-3">
            <a href={profile.resume} download={profile.resumeDownloadName} className={cn(buttonStyles.base, buttonStyles.primary, "h-11 px-6")}>
              <Download className="size-4" />
              Download resume
            </a>
            <a href="#contact" className={cn(buttonStyles.base, buttonStyles.secondary, "h-11 px-6")}>
              <Mail className="size-4" />
              Get in touch
            </a>
            <div className="ml-1 flex items-center gap-2">
              <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className={cn(buttonStyles.base, buttonStyles.icon, "size-11")}>
                <GitHubIcon className="size-[18px]" />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className={cn(buttonStyles.base, buttonStyles.icon, "size-11")}>
                <LinkedInIcon className="size-[18px]" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-subtle">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" /> {profile.location}
              </span>
              <span className="hidden h-3 w-px bg-line-strong sm:block" />
              <span>{profile.timezone}</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15} y={24} className="relative mx-auto w-full max-w-[380px] lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-surface shadow-card">
            <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-80" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-4/5 bg-[radial-gradient(55%_55%_at_50%_65%,var(--glow),transparent)]" />
            <Image
              src="/images/manav.png"
              alt="Portrait of Manav Rai"
              fill
              priority
              sizes="(min-width: 1024px) 420px, 380px"
              className="object-contain object-bottom pt-6"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-surface via-surface/70 to-transparent" />
          </div>

          <div className="absolute -left-3 bottom-24 rounded-2xl border border-line bg-surface/85 p-3 pr-4 shadow-card backdrop-blur-xl sm:-left-8">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <Briefcase className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">Currently</p>
                <p className="whitespace-nowrap text-sm font-medium text-fg">
                  {profile.role} @ {profile.company}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -right-3 bottom-6 rounded-2xl border border-line bg-surface/85 p-3 pr-4 shadow-card backdrop-blur-xl sm:-right-6">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <GraduationCap className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-wider text-subtle">B.Tech CSE · 2026</p>
                <p className="whitespace-nowrap text-sm font-medium text-fg">{education.school.split(",")[0]}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container-x mt-20 sm:mt-24">
        <Stats />
      </div>
    </section>
  );
}
