"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HallMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        frameRef.current,
        { y: 80, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top 82%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hall-map"
      className="bg-[#0A0A0A] py-24 md:py-32 px-6 md:px-10"
      aria-label="Схема зала"
    >
      <div ref={titleRef} className="opacity-0 mb-12 md:mb-16">
        <p className="font-body text-xs tracking-[0.3em] text-[#FF2B2B] uppercase mb-4">
          — 04 / СХЕМА ЗАЛА
        </p>
        <h2 className="font-display text-[12vw] md:text-[9vw] leading-none text-[#F5F0EC] uppercase">
          КАРТА
          <br />
          РАССАДКИ
        </h2>
      </div>

      <div
        ref={frameRef}
        className="opacity-0 relative rounded-[2rem] border-2 border-white/70 bg-[#0d0e12] overflow-hidden shadow-[0_16px_45px_rgba(0,0,0,0.45)]"
      >
        <Image
          src="/images/hall-map.png"
          alt="Схема зала DUST GAME CLUB"
          width={1024}
          height={1024}
          className="w-full h-auto object-cover"
          priority={false}
        />
      </div>
    </section>
  );
}
