"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Это не просто клуб — это отдельная культура. Железо, атмосфера, люди — всё на уровне.",
    author: "АРТЁМ К.",
    tag: "CS2 · 2200 рейтинг",
    num: "01",
  },
  {
    quote:
      "Приехал один раз и остался. Каждый вечер здесь — это турнир, даже если не объявлен.",
    author: "ДАНИЛА Ш.",
    tag: "DOTA 2 · 5500 MMR",
    num: "02",
  },
  {
    quote:
      "Железо и посадка реально удобные: стабильный фпс, отличный звук и комфорт даже в длинных сессиях.",
    author: "ВЛАД М.",
    tag: "Apex · Predator",
    num: "03",
  },
];

const members = [
  { initials: "АК", color: "#FF2B2B" },
  { initials: "ДШ", color: "#0A0A0A" },
  { initials: "ВМ", color: "#FF2B2B" },
  { initials: "НО", color: "#0A0A0A" },
  { initials: "ЕС", color: "#FF2B2B" },
  { initials: "МТ", color: "#0A0A0A" },
];

export default function Community() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const quotesRef = useRef<HTMLDivElement>(null);

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

      const quotes = quotesRef.current?.querySelectorAll(".quote-item");
      quotes?.forEach((q, i) => {
        gsap.fromTo(
          q,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: quotesRef.current,
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
      id="community"
      className="bg-[#F5F0EC] py-24 md:py-32 px-6 md:px-10 overflow-hidden"
      aria-label="Community"
    >
      {/* Title */}
      <div ref={titleRef} className="opacity-0 mb-16 md:mb-24">
        <p className="font-body text-xs tracking-[0.3em] text-[#FF2B2B] uppercase mb-4">
          — 08 / КОМЬЮНИТИ
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="font-display text-[12vw] md:text-[9vw] leading-none text-[#0A0A0A] uppercase">
            ГОВОРЯТ
            <br />
            ИГРОКИ
          </h2>

          {/* Members avatars */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center -space-x-3">
              {members.map((m, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[#F5F0EC] flex items-center justify-center font-display text-xs text-[#F5F0EC]"
                  style={{ background: m.color, zIndex: members.length - i }}
                >
                  {m.initials}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-[#F5F0EC] bg-[#0A0A0A]/10 flex items-center justify-center font-body text-[10px] text-[#0A0A0A]/50 ml-1">
                +1.5k
              </div>
            </div>
            <p className="font-body text-xs tracking-[0.15em] text-[#0A0A0A]/40 uppercase">
              1 500+ участников
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div
        ref={quotesRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-px"
      >
        {testimonials.map((t) => (
          <div
            key={t.num}
            className="quote-item opacity-0 bg-[#0A0A0A] p-8 md:p-10 relative group hover:bg-[#FF2B2B] transition-colors duration-500"
          >
            {/* Number */}
            <span className="font-display text-6xl text-white/5 absolute top-6 right-6 leading-none select-none group-hover:text-white/10 transition-colors duration-500">
              {t.num}
            </span>

            {/* Quote mark */}
            <div className="font-display text-5xl text-[#FF2B2B] group-hover:text-white/40 leading-none mb-4 transition-colors duration-500">
              "
            </div>

            {/* Quote text */}
            <p className="font-body text-base md:text-lg text-[#F5F0EC]/80 leading-relaxed mb-8 group-hover:text-[#F5F0EC] transition-colors duration-500">
              {t.quote}
            </p>

            {/* Author */}
            <div className="mt-auto">
              <div className="w-8 h-px bg-[#FF2B2B] group-hover:bg-white/50 mb-4 transition-colors duration-500" />
              <p className="font-display text-lg text-[#F5F0EC] uppercase mb-1">
                {t.author}
              </p>
              <p className="font-body text-xs tracking-[0.15em] text-[#F5F0EC]/40 group-hover:text-[#F5F0EC]/60 uppercase transition-colors duration-500">
                {t.tag}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Social strip */}
      <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-[#0A0A0A]/10">
        <div className="flex items-center gap-6">
          <a
            href="https://t.me/dustgameclub"
            target="_blank"
            rel="noreferrer"
            className="font-body text-xs tracking-[0.2em] text-[#0A0A0A]/50 hover:text-[#FF2B2B] transition-colors duration-300 uppercase"
          >
            Telegram
          </a>
          <a
            href="https://vk.com/dustgameclub"
            target="_blank"
            rel="noreferrer"
            className="font-body text-xs tracking-[0.2em] text-[#0A0A0A]/50 hover:text-[#FF2B2B] transition-colors duration-300 uppercase"
          >
            VK
          </a>
          <a
            href="#"
            className="font-body text-xs tracking-[0.2em] text-[#0A0A0A]/50 hover:text-[#FF2B2B] transition-colors duration-300 uppercase"
          >
            Discord
          </a>
          <a
            href="#"
            className="font-body text-xs tracking-[0.2em] text-[#0A0A0A]/50 hover:text-[#FF2B2B] transition-colors duration-300 uppercase"
          >
            YouTube
          </a>
        </div>
        <p className="font-body text-xs tracking-[0.15em] text-[#0A0A0A]/30 uppercase">
          Присоединяйся к комьюнити
        </p>
      </div>
    </section>
  );
}
