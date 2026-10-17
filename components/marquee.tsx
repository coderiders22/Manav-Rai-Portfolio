import { organisations } from "@/lib/data";

export function Marquee() {
  const items = [...organisations, ...organisations];
  return (
    <section aria-label="Organisations I've worked with" className="py-12 sm:py-16">
      <p className="container-x mb-6 text-center font-mono text-xs uppercase tracking-[0.18em] text-subtle">
        Experience across enterprise, healthcare &amp; defense
      </p>
      <div className="group relative flex overflow-hidden mask-fade-x">
        <ul className="flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]">
          {items.map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= organisations.length}
              className="flex items-center whitespace-nowrap px-6 text-lg font-semibold tracking-tight text-subtle/80 transition-colors hover:text-fg sm:px-10 sm:text-xl"
            >
              {name}
              <span className="ml-12 size-1 rounded-full bg-line-strong sm:ml-20" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
