"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { stats } from "@/lib/data";

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {value}
        {suffix}
      </span>
    </>
  );
}

export function Stats() {
  return (
    <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4" style={{ gap: 1 }}>
      {stats.map((s) => (
        <div key={s.label} className="bg-bg-soft p-5 sm:p-7">
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <p className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm font-medium text-fg/90">{s.label}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-subtle">{s.detail}</p>
          </dd>
        </div>
      ))}
    </dl>
  );
}
