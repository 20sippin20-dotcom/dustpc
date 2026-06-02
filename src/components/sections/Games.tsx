"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const games = [
  {
    title: "CS2",
    full: "COUNTER-STRIKE 2",
    genre: "Тактический шутер",
    players: "12 000+",
    active: true,
  },
  {
    title: "DOTA",
    full: "DOTA 2",
    genre: "MOBA стратегия",
    players: "8 500+",
    active: false,
  },
  {
    title: "VALORANT",
    full: "VALORANT",
    genre: "Тактический шутер",
    players: "6 200+",
    active: true,
  },
  {
    title: "APEX",
    full: "APEX LEGENDS",
    genre: "Battle Royale",
    players: "4 100+",
    active: false,
  },
  {
    title: "LOL",
    full: "LEAGUE OF LEGENDS",
    genre: "MOBA стратегия",
    players: "5 300+",
    active: false,
  },
];

export default function Games() {
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

      const rows = listRef.current?.querySelectorAll(".game-row");
      rows?.forEach((row, i) => {
        gsap.fromTo(
          row,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.1,
            ease: "power3.out",
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
      id="games"
      className="relative bg-[#F5F0EC] py-24 md:py-32 overflow-hidden"
      aria-label="Games universe"
    >
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none" aria-hidden="true">
        <span className="font-display text-[40vw] leading-none text-[#0A0A0A]/3 select-none whitespace-nowrap">
          PLAY
        </span>
      </div>

      <div className="relative px-6 md:px-10">
        {/* Title */}
        <div ref={titleRef} className="opacity-0 mb-16 md:mb-20">
          <p className="font-body text-xs tracking-[0.3em] text-[#FF2B2B] uppercase mb-4">
            — 04 / ИГРЫ
          </p>
          <h2 className="font-display text-[12vw] md:text-[9vw] leading-none text-[#0A0A0A] uppercase">
            ВСЕЛЕННАЯ
            <br />
            ИГР
          </h2>
        </div>

        {/* Game list */}
        <div ref={listRef} className="space-y-0">
          {games.map((game, i) => (
            <div
              key={game.title}
              className="game-row opacity-0 group relative border-b border-[#0A0A0A]/12 py-6 md:py-8 flex items-center justify-between cursor-pointer"
              role="listitem"
            >
              {/* Hover bg */}
              <div className="absolute inset-0 bg-[#FF2B2B] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500" />

              <div className="relative flex items-center gap-6 md:gap-10">
                {/* Number */}
                <span className="font-display text-lg md:text-2xl text-[#0A0A0A]/25 group-hover:text-[#F5F0EC]/40 transition-colors duration-300 w-10">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Title */}
                <div>
                  <h3 className="font-display text-[8vw] md:text-[4.5vw] lg:text-[3.5vw] leading-none text-[#0A0A0A] group-hover:text-[#F5F0EC] transition-colors duration-300 uppercase">
                    {game.full}
                  </h3>
                  <p className="font-body text-xs tracking-[0.15em] text-[#0A0A0A]/40 group-hover:text-[#F5F0EC]/60 transition-colors duration-300 mt-1 uppercase">
                    {game.genre}
                  </p>
                </div>
              </div>

              {/* Right info */}
              <div className="relative flex items-center gap-4 md:gap-8">
                {game.active && (
                  <motion.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="hidden md:flex items-center gap-1.5 font-body text-xs tracking-[0.15em] text-[#FF2B2B] group-hover:text-[#F5F0EC] uppercase"
                  >
                    <span className="w-1.5 h-1.5 bg-[#FF2B2B] group-hover:bg-[#F5F0EC] rounded-full" />
                    Активный турнир
                  </motion.span>
                )}
                <span className="font-display text-xl md:text-2xl text-[#0A0A0A]/30 group-hover:text-[#F5F0EC]/50 transition-colors duration-300">
                  {game.players}
                </span>
                <span className="font-body text-[10px] tracking-[0.2em] text-[#0A0A0A]/30 group-hover:text-[#F5F0EC]/40 hidden md:block transition-colors duration-300 uppercase">
                  игроков
                </span>
                <div className="w-8 h-px bg-[#0A0A0A]/20 group-hover:bg-[#F5F0EC]/40 group-hover:w-14 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="flex items-center justify-between mt-10 pt-6">
          <p className="font-body text-xs tracking-[0.15em] text-[#0A0A0A]/40 uppercase">
            + 20 других дисциплин
          </p>
          <a
            href="#tournaments"
            className="font-body text-xs tracking-[0.2em] text-[#FF2B2B] hover-line uppercase"
          >
            Смотреть турниры →
          </a>
        </div>
      </div>
    </section>
  );
}
