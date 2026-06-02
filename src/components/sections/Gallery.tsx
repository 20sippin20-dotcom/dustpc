"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    id: 1,
    label: "Основной зал",
    size: "large",
    color: "#1A1A1A",
    accent: "#FF2B2B",
    num: "01",
  },
  {
    id: 2,
    label: "VIP комната",
    size: "medium",
    color: "#141414",
    accent: "#FF2B2B",
    num: "02",
  },
  {
    id: 4,
    label: "Зона ресепшен",
    size: "medium",
    color: "#181818",
    accent: "#FF2B2B",
    num: "04",
  },
  {
    id: 5,
    label: "Консольная зона",
    size: "large",
    color: "#121212",
    accent: "#FF2B2B",
    num: "05",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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

      const cells = trackRef.current?.querySelectorAll(".gallery-cell");
      cells?.forEach((cell, i) => {
        gsap.fromTo(
          cell,
          { y: 50, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.95,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: trackRef.current,
              start: "top 78%",
            },
          }
        );
      });

      cells?.forEach((cell) => {
        const inner = cell.querySelector(".gallery-inner");
        if (!inner) return;
        gsap.to(inner, {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: cell,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="bg-[#0A0A0A] py-24 md:py-32 px-6 md:px-10"
      aria-label="Club gallery"
    >
      {/* Title */}
      <div ref={titleRef} className="opacity-0 mb-16 md:mb-20">
        <p className="font-body text-xs tracking-[0.3em] text-[#FF2B2B] uppercase mb-4">
          — 03 / ПРОСТРАНСТВО
        </p>
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h2 className="font-display text-[11.2vw] sm:text-[11vw] md:text-[9vw] leading-[0.92] text-[#F5F0EC] uppercase whitespace-nowrap">
            НАШЕ
            <br />
            ПРОСТРАНСТВО
          </h2>
          <p className="font-body text-sm text-[#F5F0EC]/40 max-w-xs leading-relaxed hidden md:block">
            18 мест премиального оборудования.
            <br />
            Три отдельные зоны. Один уровень.
          </p>
        </div>
      </div>

      {/* Horizontal gallery */}
      <div
        ref={trackRef}
        className="flex gap-3 overflow-x-auto overflow-y-hidden pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img) => (
          <article
            key={img.id}
            className="gallery-cell snap-start shrink-0 w-[86vw] sm:w-[62vw] lg:w-[38vw] xl:w-[31vw] aspect-[4/3] opacity-0 overflow-hidden relative group border border-white/10 rounded-2xl"
          >
            <div className="gallery-inner absolute inset-0 -top-6" style={{ background: img.color }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-[28vw] sm:text-[16vw] lg:text-[8vw] text-white/5 select-none">
                  {img.num}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-[#FF2B2B] group-hover:w-full transition-all duration-700" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/74 to-transparent z-10" />
            <div className="absolute bottom-5 left-5 z-20">
              <span className="font-body text-[10px] tracking-[0.22em] text-[#FF2B2B] uppercase block mb-1">
                {img.num}
              </span>
              <p className="font-display text-xl md:text-2xl text-[#F5F0EC] uppercase">
                {img.label}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Count indicator */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/8">
        <span className="font-body text-xs tracking-[0.2em] text-white/30 uppercase">
          4 зоны · 18 мест
        </span>
        <span className="font-body text-xs tracking-[0.2em] text-[#FF2B2B] uppercase">
          Листай горизонтально →
        </span>
      </div>
    </section>
  );
}
