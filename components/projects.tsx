import { profile } from "@/lib/data";
import { FeaturedProjects } from "./featured-projects";
import { GitHubIcon } from "./icons";
import { ProjectGrid } from "./project-grid";
import { Reveal } from "./reveal";
import { SectionHeading, Serif } from "./ui";

export function Projects() {
  return (
    <section id="projects" className="container-x py-20 sm:py-28">
      <SectionHeading
        index="03"
        eyebrow="Selected work"
        title={
          <>
            Systems I&apos;ve designed, <Serif>built and shipped.</Serif>
          </>
        }
        description="Three production builds: two GenAI platforms built at Gemini Solutions and a healthcare app used by real patients."
      />
      <FeaturedProjects />
      <div className="mt-20 sm:mt-24">
        <ProjectGrid />
      </div>
      <Reveal className="mt-10 flex justify-center">
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <GitHubIcon className="size-4" />
          More on GitHub <span className="font-mono text-subtle">@{profile.socials.githubHandle}</span>
        </a>
      </Reveal>
    </section>
  );
}
