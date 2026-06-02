"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const blobRef = useRef<SVGEllipseElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blob enters on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          const tl = gsap.timeline();
          tl.fromTo(
            blobRef.current,
            { attr: { rx: "0", ry: "0", cy: "60" } },
            {
              attr: { rx: "75", ry: "80" },
              duration: 1.4,
              ease: "power4.out",
            }
          );
          tl.fromTo(
            blobRef.current,
            {},
            {
              attr: { rx: "120", ry: "130" },
              duration: 0.8,
              ease: "power2.in",
            },
            0.9
          );
          tl.fromTo(
            contentRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
            1.2
          );
        },
      });

      // Parallax on title
      gsap.to(titleRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative bg-[#0A0A0A] min-h-screen flex flex-col items-center justify-center overflow-hidden py-24"
      aria-label="Final call to action"
    >
      {/* Liquid blob fill */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="cta-blur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>
        <ellipse
          ref={blobRef}
          cx="50"
          cy="50"
          rx="0"
          ry="0"
          fill="#FF2B2B"
          filter="url(#cta-blur)"
        />
      </svg>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-6 opacity-0"
      >
        {/* Pre-label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-px bg-[#F5F0EC]/30" />
          <span className="font-body text-xs tracking-[0.3em] text-[#F5F0EC]/40 uppercase">
            09 / ВОЙДИ В ПЫЛЬ
          </span>
          <div className="w-8 h-px bg-[#F5F0EC]/30" />
        </div>

        {/* Big title */}
        <div ref={titleRef}>
          <h2 className="font-display text-[18vw] md:text-[14vw] leading-none text-[#F5F0EC] uppercase tracking-tight">
            ГОТОВ
            <br />
            ИГРАТЬ?
          </h2>
        </div>

        {/* Subtitle */}
        <p className="font-body text-base md:text-xl text-[#F5F0EC]/60 max-w-lg mt-6 leading-relaxed">
          Присоединяйся к DUST GAME CLUB.
          <br />
          Место, где серьёзных игроков становится больше.
        </p>

        {/* CTA group */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <a
            href="#booking"
            className="site-cta site-cta-outline px-7 md:px-10 py-3.5 md:py-5"
          >
            ЗАБРОНИРОВАТЬ
          </a>
          <a
            href="https://vk.com/dustgameclub"
            target="_blank"
            rel="noreferrer"
            className="site-cta site-cta-red px-7 md:px-10 py-3.5 md:py-5"
          >
            НАПИСАТЬ В VK
          </a>
        </div>

        {/* Address */}
        <div className="mt-14 flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-[#F5F0EC]/10" />
          <p className="font-body text-xs tracking-[0.2em] text-[#F5F0EC]/30 uppercase">
            Ухта · ул. 30 лет Октября, 21А
          </p>
          <p className="font-body text-xs tracking-[0.2em] text-[#F5F0EC]/20 uppercase">
            Работаем и отвечаем 24/7
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 px-6 md:px-10 py-6 flex items-center justify-between border-t border-white/5">
        <span className="font-display text-sm text-[#F5F0EC]/20 tracking-widest uppercase">
          DUST © 2026
        </span>

        <div className="flex items-center gap-6">
          <a
            href="https://t.me/dustgameclub"
            target="_blank"
            rel="noreferrer"
            className="font-body text-[10px] tracking-[0.2em] text-[#F5F0EC]/25 hover:text-[#FF2B2B] transition-colors duration-300 uppercase"
          >
            Telegram
          </a>
          <a
            href="https://vk.com/dustgameclub"
            target="_blank"
            rel="noreferrer"
            className="font-body text-[10px] tracking-[0.2em] text-[#F5F0EC]/25 hover:text-[#FF2B2B] transition-colors duration-300 uppercase"
          >
            VK
          </a>
        </div>

        <span className="font-body text-[10px] tracking-[0.15em] text-[#F5F0EC]/15 uppercase hidden md:block">
          Политика конфиденциальности
        </span>
      </footer>

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-[#FF2B2B]"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.6, 0],
              scale: [1, 3, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
}
