"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: 1500, suffix: "+", label: "Игроков", sub: "активных участников" },
  { num: 18, suffix: "", label: "Мест", sub: "рабочих станций" },
  { num: 240, suffix: "Hz", label: "Дисплеи", sub: "частота обновления" },
  { num: 200, suffix: "+", label: "Турниров", sub: "проведено за год" },
];

function Counter({
  target,
  suffix,
  duration = 2,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          { val: 0 },
          { val: target },
          {
            duration,
            ease: "power2.out",
            onUpdate: function () {
              if (el) {
                el.textContent = Math.floor(this.targets()[0].val) + suffix;
              }
            },
          }
        );
      },
    });
  }, [target, suffix, duration]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      const items = sectionRef.current?.querySelectorAll(".stat-item");
      items?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current?.querySelector(".stats-grid"),
              start: "top 70%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      className="relative bg-[#F5F0EC] py-24 md:py-32 px-6 md:px-10 overflow-hidden"
      aria-label="Statistics"
    >
      {/* Decorative large text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-display text-[50vw] leading-none text-[#0A0A0A]/3 select-none">
          №1
        </span>
      </div>

      <div className="relative">
        {/* Title */}
        <div ref={titleRef} className="opacity-0 mb-16 md:mb-24">
          <p className="font-body text-xs tracking-[0.3em] text-[#FF2B2B] uppercase mb-4">
            — 06 / ЦИФРЫ
          </p>
          <h2 className="font-display text-[12vw] md:text-[9vw] leading-none text-[#0A0A0A] uppercase">
            ЭТО
            <br />
            ФАКТЫ
          </h2>
        </div>

        {/* Stats grid */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-px">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item opacity-0 py-10 md:py-16 pr-8 border-b md:border-b-0 md:border-r border-[#0A0A0A]/10 last:border-r-0"
            >
              {/* Number */}
              <div className="font-display text-[14vw] md:text-[7vw] leading-none text-[#0A0A0A] mb-4 tabular-nums">
                <Counter
                  target={stat.num}
                  suffix={stat.suffix}
                  duration={2.5}
                />
              </div>

              {/* Red line */}
              <div className="w-8 h-px bg-[#FF2B2B] mb-4" />

              {/* Label */}
              <p className="font-display text-xl md:text-2xl text-[#0A0A0A] uppercase mb-1">
                {stat.label}
              </p>
              <p className="font-body text-xs tracking-[0.1em] text-[#0A0A0A]/40 uppercase">
                {stat.sub}
              </p>
            </div>
          ))}
        </div>

        {/* Marquee strip */}
        <div className="mt-16 md:mt-24 overflow-hidden border-t border-[#0A0A0A]/10 pt-6">
          <div className="marquee-track">
            {[0, 1].map((group) => (
              <div key={group} className="flex shrink-0 items-center">
                {["DUST GAME CLUB", "PLAY HARD", "WIN BIG"].map((item) => (
                  <span
                    key={`${group}-${item}`}
                    className="font-display text-[6vw] md:text-[3vw] text-[#0A0A0A]/10 uppercase whitespace-nowrap mr-8 md:mr-10"
                  >
                    {item}
                    <span className="ml-8 md:ml-10">×</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
