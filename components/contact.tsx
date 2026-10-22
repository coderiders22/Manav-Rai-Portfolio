import { ArrowUpRight, Download, Eye, Mail, Phone } from "lucide-react";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ContactForm } from "./contact-form";
import { CopyButton } from "./copy-button";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Reveal } from "./reveal";
import { Serif, buttonStyles } from "./ui";

const channels = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, copy: true },
  { icon: Phone, label: "Phone", value: profile.phone, href: profile.phoneHref },
  { icon: LinkedInIcon, label: "LinkedIn", value: `in/${profile.socials.linkedinHandle}`, href: profile.socials.linkedin, external: true },
  { icon: GitHubIcon, label: "GitHub", value: `@${profile.socials.githubHandle}`, href: profile.socials.github, external: true },
];

export function Contact() {
  return (
    <section id="contact" className="container-x pb-20 sm:pb-28">
      <Reveal>
        <div className="card relative overflow-hidden p-5 sm:p-10 lg:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-grid opacity-50 mask-fade-y" />
            <div className="absolute -left-40 -top-40 size-[480px] rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
          </div>

          <div className="relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-subtle">
                <span className="text-accent">06</span>
                <span className="size-1 rounded-full bg-line-strong" />
                Contact
              </p>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl md:leading-[1.05]">
                Let&apos;s <Serif>talk.</Serif>
              </h2>
              <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted">
                Have a project, an idea or a question? Drop a note here or email me, and I&apos;ll get back to you within 24
                hours.
              </p>

              <ul className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-bg-soft/80">
                {channels.map(({ icon: Icon, label, value, href, copy, external }) => (
                  <li key={label} className="group relative flex items-center gap-4 px-4 py-3.5 transition-colors hover:bg-surface-2/60">
                    <Icon className="size-4 shrink-0 text-subtle" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-medium uppercase tracking-wider text-subtle">{label}</p>
                      <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="block truncate text-sm font-medium text-fg after:absolute after:inset-0"
                      >
                        {value}
                      </a>
                    </div>
                    {copy ? (
                      <CopyButton value={value} label={`Copy ${label.toLowerCase()}`} />
                    ) : (
                      <ArrowUpRight className="size-4 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={profile.resume} download={profile.resumeDownloadName} className={cn(buttonStyles.base, buttonStyles.primary)}>
                  <Download className="size-4" /> Download resume
                </a>
                <a href={profile.resume} target="_blank" rel="noopener" className={cn(buttonStyles.base, buttonStyles.secondary)}>
                  <Eye className="size-4" /> View PDF
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-surface/70 p-5 backdrop-blur sm:p-7">
              <h3 className="text-lg font-semibold tracking-tight text-fg">Send a message</h3>
              <p className="mb-6 mt-1 text-sm text-muted">A project, a question, or just a hello. All welcome.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
