import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";
import { GitHubIcon, LinkedInIcon, Monogram } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Monogram />
          <div>
            <p className="text-sm font-medium text-fg">{profile.name}</p>
            <p className="text-xs text-subtle">
              © {new Date().getFullYear()} · {profile.location}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 text-sm text-muted">
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-fg">
            <GitHubIcon className="size-4" /> GitHub
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-fg">
            <LinkedInIcon className="size-4" /> LinkedIn
          </a>
          <a href="#top" className="inline-flex items-center gap-1.5 hover:text-fg">
            <ArrowUp className="size-4" /> Top
          </a>
        </div>
      </div>
    </footer>
  );
}
