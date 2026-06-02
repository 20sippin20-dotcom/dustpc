"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const LiquidScene = dynamic(() => import("@/components/core/LiquidScene"), {
  ssr: false,
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const bgWordRef = useRef<HTMLDivElement>(null);
  const shadowWordRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const [liquidProgress, setLiquidProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Curtain reveal
      tl.fromTo(
        revealRef.current,
        { yPercent: 0, opacity: 1 },
        {
          yPercent: -102,
          opacity: 0.95,
          duration: 1.25,
          ease: "power4.out",
        },
        0
      );

      // Liquid scene fades in
      tl.add(() => {
        gsap.to(
          {},
          {
            duration: 0.5,
            onUpdate: function () {
              setLiquidProgress(this.progress() * 0.6);
            },
          }
        );
      }, 0.2);

      // 2. Living background words
      tl.to(
        [bgWordRef.current, shadowWordRef.current],
        {
          y: 0,
          opacity: 0.32,
          duration: 1.1,
          stagger: 0.08,
          ease: "power3.out",
        },
        0.55
      );

      // 4. DUST text reveal (clip-path from center)
      tl.fromTo(
        dustRef.current,
        { clipPath: "inset(0 50% 0 50%)" },
        {
          clipPath: "inset(0 0% 0 0%)",
          duration: 1.2,
          ease: "expo.out",
        },
        1.4
      );

      // 5. Subtitle slides up
      tl.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
        2.4
      );

      // 6. Tagline
      tl.fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        2.9
      );

      // 7. CTAs
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        3.2
      );

      // 8. Scroll indicator
      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6 },
        3.8
      );

      // Scroll parallax
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          setLiquidProgress(0.6 + self.progress * 0.3);
          if (dustRef.current) {
            gsap.set(dustRef.current, { y: self.progress * -60 });
          }
          if (bgWordRef.current) {
            gsap.set(bgWordRef.current, { y: self.progress * -30 });
          }
          if (subtitleRef.current) {
            gsap.set(subtitleRef.current, { y: self.progress * -40 });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen bg-[#FF2B2B] overflow-hidden flex flex-col items-center justify-center"
      aria-label="Hero section"
    >
      {/* R3F liquid background */}
      <div className="absolute inset-0 z-0 opacity-70 mix-blend-multiply">
        <LiquidScene progress={liquidProgress} />
      </div>

      {/* Background words */}
      <div
        ref={bgWordRef}
        className="absolute inset-0 z-[1] flex items-center justify-center opacity-0 translate-y-12 pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-body font-black text-[31vw] md:text-[28vw] leading-none tracking-[-0.04em] text-[#F5F0EC]/32">
          DUST
        </span>
      </div>
      <div
        ref={shadowWordRef}
        className="absolute inset-0 z-[1] flex items-center justify-center opacity-0 translate-y-10 pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-body font-black text-[31vw] md:text-[28vw] leading-none tracking-[-0.04em] text-[#0A0A0A]/12">
          DUST
        </span>
      </div>

      {/* Reveal curtain */}
      <div
        ref={revealRef}
        className="absolute inset-0 z-10 bg-[#0A0A0A] pointer-events-none"
      />

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 w-full">
        {/* DUST final frame from reveal animation */}
        <div
          ref={dustRef}
          style={{ clipPath: "inset(0 50% 0 50%)" }}
          className="overflow-visible"
        >
          <h1
            className="font-body font-black text-[22vw] md:text-[20vw] lg:text-[18vw] leading-none text-[#0A0A0A] tracking-[-0.03em] select-none drop-shadow-[0_1px_0_rgba(245,240,236,0.35)]"
            aria-label="DUST"
          >
            DUST
          </h1>
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef} className="opacity-0 mt-2 md:mt-4">
          <p className="font-display text-[4.5vw] md:text-[3.5vw] lg:text-[2.8vw] tracking-[0.24em] text-[#0A0A0A] uppercase">
            МЕСТО, ГДЕ ИГРАЮТ ВСЕРЬЁЗ
          </p>
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className="opacity-0 mt-4 md:mt-6">
          <p className="font-body text-sm md:text-base text-[#0A0A0A]/60 tracking-[0.15em] max-w-sm">
            Ухта · ул. 30 лет Октября, 21А · 24/7
          </p>
        </div>

        {/* CTA buttons */}
        <div
          ref={ctaRef}
          className="opacity-0 flex flex-col sm:flex-row items-center gap-4 mt-8 md:mt-10"
        >
          <a
            href="#pricing"
            className="hero-cta hero-cta-primary"
          >
            <span>ВОЙТИ В КЛУБ</span>
          </a>

          <a
            href="#hardware"
            className="hero-cta hero-cta-secondary"
          >
            <span>УЗНАТЬ БОЛЬШЕ</span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        aria-hidden="true"
      >
        <span className="font-body text-[10px] tracking-[0.3em] text-[#0A0A0A]/40 uppercase">
          Scroll
        </span>
        <motion.div
          className="w-px h-12 bg-[#0A0A0A]/20 origin-top"
          animate={{ scaleY: [1, 0, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Bottom tag line */}
      <div className="absolute bottom-8 right-6 md:right-10 z-20 hidden md:block" aria-hidden="true">
        <p className="font-body text-[10px] tracking-[0.25em] text-[#0A0A0A]/30 uppercase rotate-90 origin-right">
          Game Club · Est. 2024
        </p>
      </div>

      {/* Year tag */}
      <div className="absolute bottom-8 left-6 md:left-10 z-20 hidden md:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 0.6 }}
          className="flex items-center gap-2"
        >
          <div className="w-4 h-px bg-[#FF2B2B]" />
          <span className="font-body text-[10px] tracking-[0.2em] text-[#0A0A0A]/40 uppercase">
            DUST — 01
          </span>
        </motion.div>
      </div>
    </section>
  );
}
