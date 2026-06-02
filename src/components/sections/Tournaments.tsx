"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const tournaments = [
  {
    id: "T01",
    name: "DUST CUP",
    game: "CS2",
    date: "14 ИЮНЯ 2026",
    prize: "150 000 ₽",
    status: "open",
    slots: "16/32",
    statusLabel: "Регистрация открыта",
  },
  {
    id: "T02",
    name: "DOTA INVITATIONAL",
    game: "DOTA 2",
    date: "21 ИЮНЯ 2026",
    prize: "80 000 ₽",
    status: "open",
    slots: "8/16",
    statusLabel: "Регистрация открыта",
  },
  {
    id: "T03",
    name: "VALORANT OPEN",
    game: "VALORANT",
    date: "5 ИЮЛЯ 2026",
    prize: "60 000 ₽",
    status: "upcoming",
    slots: "—",
    statusLabel: "Скоро открытие",
  },
  {
    id: "T04",
    name: "APEX LEGENDS CUP",
    game: "APEX LEGENDS",
    date: "19 ИЮЛЯ 2026",
    prize: "40 000 ₽",
    status: "upcoming",
    slots: "—",
    statusLabel: "Скоро открытие",
  },
];

export default function Tournaments() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

      const rows = listRef.current?.querySelectorAll(".t-row");
      rows?.forEach((row, i) => {
        gsap.fromTo(
          row,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: listRef.current,
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
      id="tournaments"
      className="bg-[#0A0A0A] py-24 md:py-32 px-6 md:px-10"
      aria-label="Tournament events"
    >
      {/* Title */}
      <div ref={titleRef} className="opacity-0 mb-16 md:mb-20">
        <p className="font-body text-xs tracking-[0.3em] text-[#FF2B2B] uppercase mb-4">
          — 07 / ТУРНИРЫ
        </p>
        <div className="flex items-end justify-between flex-wrap gap-6">
          <h2 className="font-display text-[12vw] md:text-[9vw] leading-none text-[#F5F0EC] uppercase">
            СЕЗОН
            <br />
            2026
          </h2>
          <div className="hidden md:flex flex-col items-end gap-2">
            <p className="font-body text-sm text-[#F5F0EC]/40">
              Ближайшие соревнования
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF2B2B] rounded-full animate-pulse" />
              <span className="font-body text-xs text-[#FF2B2B] tracking-[0.15em] uppercase">
                2 открытых турнира
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tournament list */}
      <div ref={listRef} className="space-y-0">
        {tournaments.map((t) => (
          <div
            key={t.id}
            className="t-row opacity-0 group border-b border-white/8 py-6 md:py-8 grid grid-cols-1 md:grid-cols-[auto_1fr_auto_auto] gap-4 md:gap-8 items-center hover:border-[#FF2B2B]/30 transition-all duration-400"
            role="listitem"
          >
            {/* ID */}
            <span className="font-display text-2xl text-white/20 w-14 hidden md:block">
              {t.id}
            </span>

            {/* Main info */}
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-display text-[6vw] md:text-[3vw] lg:text-[2.5vw] leading-none text-[#F5F0EC] group-hover:text-[#FF2B2B] transition-colors duration-300 uppercase">
                  {t.name}
                </h3>
                {t.status === "open" && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 bg-[#FF2B2B] rounded-full flex-shrink-0"
                  />
                )}
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                <span className="font-body text-xs tracking-[0.2em] text-white/40 uppercase">
                  {t.game}
                </span>
                <span className="font-body text-xs tracking-[0.2em] text-white/25 uppercase">
                  {t.date}
                </span>
              </div>
            </div>

            {/* Slots & status */}
            <div className="hidden md:flex flex-col items-end gap-1">
              <span
                className={`font-body text-xs tracking-[0.15em] uppercase ${
                  t.status === "open" ? "text-[#FF2B2B]" : "text-white/30"
                }`}
              >
                {t.statusLabel}
              </span>
              {t.slots !== "—" && (
                <span className="font-body text-xs text-white/25">
                  {t.slots} слотов
                </span>
              )}
            </div>

            {/* Prize + CTA */}
            <div className="flex items-center gap-4 md:gap-6">
              <div className="text-right hidden md:block">
                <p className="font-body text-[10px] tracking-[0.15em] text-white/30 uppercase mb-1">
                  Призовой фонд
                </p>
                <p className="font-display text-xl md:text-2xl text-[#F5F0EC]">
                  {t.prize}
                </p>
              </div>
              {t.status === "open" ? (
                <a href="#" className="site-cta site-cta-red px-5 py-2.5 flex-shrink-0">
                  ВСТУПИТЬ
                </a>
              ) : (
                <span className="site-cta site-cta-disabled px-5 py-2.5 flex-shrink-0">
                  СКОРО
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA strip */}
      <div className="mt-16 p-8 md:p-12 border border-white/8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-display text-3xl md:text-4xl text-[#F5F0EC] uppercase mb-2">
            СЛЕДИ ЗА СЕЗОНОМ
          </p>
          <p className="font-body text-sm text-[#F5F0EC]/40">
            Подпишись на уведомления о новых турнирах
          </p>
        </div>
        <a
          href="#"
          className="site-cta site-cta-red px-8 py-4 text-sm tracking-[0.2em] flex-shrink-0"
        >
          ПОДПИСАТЬСЯ
        </a>
      </div>
    </section>
  );
}
