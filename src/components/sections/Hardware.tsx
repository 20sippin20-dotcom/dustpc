"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const hardwareBoards = [
  {
    num: "01",
    name: "STANDART",
    leftTop: ["ПРОЦЕССОР", "ВИДЕОКАРТА", "ОЗУ"],
    leftBottom: ["МОНИТОР", "КРЕСЛО", "КЛАВИАТУРА", "МЫШКА", "НАУШНИКИ"],
    models: [
      "AMD RYZEN 5 5600 3,5/4,4GHZ",
      "KFA2 GEFORCE RTX 4060 CORE",
      "DDR4 [16 ГБ]",
      "ARDOR GAMING NOVA 27\" [180HZ, IPS]",
      "ARDOR GAMING FORCE ARMOR 5000M",
      "RED SQUARE TKL PURPLE HAZE",
      "LOGITECH G102",
      "ARDOR GAMING EDGE",
    ],
  },
  {
    num: "02",
    name: "VIP",
    leftTop: ["ПРОЦЕССОР", "ВИДЕОКАРТА", "ОЗУ"],
    leftBottom: ["МОНИТОР", "КРЕСЛО", "КЛАВИАТУРА", "МЫШКА", "НАУШНИКИ"],
    models: [
      "AMD RYZEN 5 7500F 3,7/5GHZ",
      "MSI GEFORCE RTX 4070 SUPER VENTUS",
      "DDR5 [32 ГБ]",
      "LG 27\" [240HZ, 2K, IPS]",
      "ARDOR GAMING FORCE ARMOR 5000M",
      "RED SQUARE TYPEX V2 AMETHYST",
      "LOGITECH G PRO",
      "ARDOR GAMING EDGE",
    ],
  },
  {
    num: "03",
    name: "КОНСОЛЬ",
    leftTop: ["КОНСОЛЬ", "ТЕЛЕВИЗОР"],
    leftBottom: [],
    models: ["PLAYSTATION 5", "HISENSE 85\" [QLED, 4K ULTRAHD]"],
  },
];

export default function Hardware() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
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

      // Red line expansion
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      // Individual card animations
      const cards = cardsRef.current?.querySelectorAll(".hw-card");
      if (!cards) return;
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
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
      id="hardware"
      className="relative bg-[#0A0A0A] overflow-hidden"
      aria-label="Hardware showcase"
    >
      {/* Section header */}
      <div className="px-6 md:px-10 pt-24 pb-12">
        <div ref={titleRef} className="opacity-0">
          <p className="font-body text-xs tracking-[0.3em] text-[#FF2B2B] uppercase mb-4">
            — 02 / ЖЕЛЕЗО
          </p>
          <h2 className="font-display text-[12vw] md:text-[9vw] leading-none text-[#F5F0EC] uppercase">
            ЖЕЛЕЗО
            <br />
            <span className="text-stroke" style={{ WebkitTextStroke: "2px #F5F0EC" }}>
              КЛАССА А
            </span>
          </h2>
        </div>

        {/* Red divider line */}
        <div
          ref={lineRef}
          className="mt-8 h-px bg-[#FF2B2B] origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* Vertical cards layout (no pinned horizontal trap) */}
      <div ref={cardsRef} className="px-6 md:px-10 pb-10 grid grid-cols-1 xl:grid-cols-2 gap-5">
        {hardwareBoards.map((item) => {
          const labels = [...item.leftTop, ...item.leftBottom];
          return (
            <div
              key={item.num}
              className={`hw-card opacity-0 border-2 border-white/75 rounded-[2rem] p-4 md:p-5 bg-[#0E0F13] shadow-[0_12px_40px_rgba(0,0,0,0.35)] ${
                item.name === "КОНСОЛЬ" ? "xl:col-span-2" : ""
              }`}
            >
              <div className="grid grid-cols-[minmax(132px,38%)_1fr] sm:grid-cols-[170px_1fr] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] gap-3 md:gap-5 items-stretch">
                <div className="rounded-[1.5rem] border border-white/55 p-3 md:p-4 min-w-0">
                  <div className="rounded-[1rem] bg-[#F5F0EC] text-[#0A0A0A] px-3 md:px-5 py-3 font-body font-extrabold text-xl sm:text-2xl md:text-4xl leading-none uppercase text-center">
                    {item.name}
                  </div>

                  <div className="mt-4 space-y-2">
                    {labels.map((left, index) => (
                      <div
                        key={left}
                      className={`rounded-xl px-2.5 md:px-3 py-2 min-h-[34px] md:min-h-[46px] flex items-center justify-center md:justify-start text-center md:text-left font-body font-bold text-[11px] sm:text-[13px] md:text-xl leading-none text-[#F5F0EC] uppercase whitespace-nowrap ${
                          index < item.leftTop.length
                            ? "border-2 border-white/80"
                            : "bg-white/7"
                        }`}
                      >
                        {left}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/55 p-3 md:p-4 min-w-0">
                  <div className="rounded-[1rem] bg-[#DE2B23] text-[#F5F0EC] px-3 md:px-5 py-3 font-body font-extrabold text-xl sm:text-2xl md:text-4xl leading-none uppercase text-center">
                    МОДЕЛИ
                  </div>

                  <div className="mt-4 space-y-2">
                    {item.models.map((model) => (
                      <p
                        key={model}
                        className="min-h-[34px] md:min-h-[46px] flex items-center font-body font-bold text-[11px] sm:text-[14px] md:text-[24px] lg:text-[32px] leading-[1.1] text-[#F5F0EC] uppercase tracking-tight break-words"
                      >
                        {model}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
