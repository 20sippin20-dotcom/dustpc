"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tables = [
  {
    title: "ПРАЙС ПК",
    leftTitle: "ВРЕМЯ",
    columns: ["STANDART", "VIP-ZONE"],
    rows: [
      { label: "1 ЧАС", col1: "170 / 180", col2: "180 / 190" },
      { label: "3 ЧАСА", col1: "400 / 450", col2: "500 / 550" },
      { label: "5 ЧАСОВ", col1: "550 / 600", col2: "650 / 700" },
    ],
  },
  {
    title: "ПАКЕТЫ",
    leftTitle: "ПАКЕТЫ",
    columns: ["STANDART", "VIP-ZONE"],
    rows: [
      { label: "ДЕНЬ 13:00 - 18:00", col1: "430 / 490", col2: "500 / 580" },
      { label: "НОЧЬ ЛАЙТ 20:00 - 03:00", col1: "590 / 690", col2: "650 / 750" },
      { label: "НОЧЬ 22:00 - 08:00", col1: "650 / 750", col2: "750 / 850" },
    ],
  },
  {
    title: "ПРАЙС ТВ",
    leftTitle: "ВРЕМЯ",
    columns: ["БУДНИЕ", "ВЫХОДНЫЕ"],
    rows: [
      { label: "1 ЧАС", col1: "300", col2: "350" },
      { label: "3 ЧАСА", col1: "700", col2: "800" },
      { label: "5 ЧАСОВ", col1: "900", col2: "950" },
      { label: "НОЧЬ 22:00 - 08:00", col1: "950", col2: "1050" },
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.querySelectorAll(".pricing-board");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="pricing"
      className="bg-[#0A0A0A] py-24 md:py-32 px-6 md:px-10"
      aria-label="Pricing"
    >
      {/* Title */}
      <div ref={titleRef} className="opacity-0 mb-16 md:mb-20">
        <p className="font-body text-xs tracking-[0.3em] text-[#FF2B2B] uppercase mb-4">
          — 05 / ТАРИФЫ
        </p>
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h2 className="font-display text-[12vw] md:text-[9vw] leading-none text-[#F5F0EC] uppercase">
            АКТУАЛЬНЫЙ
            <br />
            ПРАЙС
          </h2>
        </div>
      </div>

      {/* Pricing boards */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 xl:grid-cols-3 gap-4"
      >
        {tables.map((table, idx) => (
          <div
            key={table.title}
            className="pricing-board opacity-0 border border-white/15 rounded-[2rem] p-4 md:p-8 bg-[#101114] shadow-[0_0_40px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-4xl md:text-5xl text-[#F5F0EC] uppercase">
                {table.title}
              </h3>
              <span className="font-body text-[10px] text-[#F5F0EC]/40 tracking-[0.2em] uppercase">
                {idx + 1}/3
              </span>
            </div>

            <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-3 items-stretch">
              <div className="rounded-3xl border border-white/20 px-4 py-3 h-14 md:h-16 flex items-center justify-center">
                <span className="font-display text-lg md:text-3xl text-[#F5F0EC] whitespace-nowrap">
                  {table.leftTitle}
                </span>
              </div>
              <div className="rounded-3xl px-3 md:px-4 py-3 h-14 md:h-16 flex items-center justify-center bg-[#F5F0EC] min-w-0">
                <span className="font-display text-base sm:text-lg md:text-3xl text-[#0A0A0A] whitespace-nowrap leading-none">
                  {table.columns[0]}
                </span>
              </div>
              <div className="rounded-3xl px-3 md:px-4 py-3 h-14 md:h-16 flex items-center justify-center bg-[#FF2B2B] min-w-0">
                <span className="font-display text-[13px] sm:text-lg md:text-3xl text-[#F5F0EC] whitespace-nowrap leading-none">
                  {table.columns[1]}
                </span>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {table.rows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[1.1fr_1fr_1fr] gap-2 items-center"
                >
                  <div className="rounded-2xl border border-white/20 px-3 md:px-4 py-3 min-h-[58px] md:min-h-[72px] flex items-center">
                    <span className="font-body text-[11px] md:text-base text-[#F5F0EC] uppercase leading-tight">
                      {row.label}
                    </span>
                  </div>
                  <div className="px-2 py-3 min-h-[58px] md:min-h-[72px] flex items-center justify-center text-center">
                    <span className="font-body font-extrabold tabular-nums whitespace-nowrap text-[24px] md:text-[42px] leading-none text-[#F5F0EC]">
                      {row.col1}
                    </span>
                  </div>
                  <div className="px-2 py-3 min-h-[58px] md:min-h-[72px] flex items-center justify-center text-center">
                    <span className="font-body font-extrabold tabular-nums whitespace-nowrap text-[24px] md:text-[42px] leading-none text-[#F5F0EC]">
                      {row.col2}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
