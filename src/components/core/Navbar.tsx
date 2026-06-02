"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "О НАС", href: "#hardware" },
  { label: "БРОНЬ", href: "#booking" },
  { label: "ТАРИФЫ", href: "#pricing" },
  { label: "ТУРНИРЫ", href: "#tournaments" },
  { label: "КОНТАКТЫ", href: "#cta" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, delay: 0.5, ease: "power3.out" }
    );

    ScrollTrigger.create({
      start: "80px top",
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0A0A]/90 backdrop-blur-sm border-b border-white/5"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <a
        href="#"
        className="flex items-center gap-3 group"
        aria-label="DUST GAME CLUB — home"
      >
        <div className="relative h-9 w-9 overflow-hidden border border-[#F5F0EC]/20 transition-colors duration-300 group-hover:border-[#FF2B2B]">
          <Image
            src="/images/dust-logo-clean.png"
            alt="DUST logo mark"
            fill
            sizes="36px"
            className="object-cover"
            priority
          />
        </div>
        <span className="font-display text-2xl text-[#F5F0EC] tracking-widest transition-colors duration-300 group-hover:text-[#FF2B2B]">
          DUST
        </span>
      </a>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-10" role="list">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="font-body text-xs tracking-[0.2em] text-[#F5F0EC]/60 hover:text-[#F5F0EC] hover-line transition-colors duration-300"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <MagneticButton
        href="#booking"
        className={`hidden md:flex items-center gap-2 px-5 py-2.5 font-body text-xs tracking-[0.15em] transition-all duration-300 ${
          scrolled
            ? "border border-[#FF2B2B] text-[#FF2B2B] hover:bg-[#FF2B2B] hover:text-[#F5F0EC]"
            : "border border-[#0A0A0A] bg-[#0A0A0A] text-[#F5F0EC] hover:bg-[#F5F0EC] hover:text-[#0A0A0A]"
        }`}
      >
        ЗАБРОНИРОВАТЬ
      </MagneticButton>

      {/* Mobile menu icon */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Open menu"
      >
        <span className="block w-6 h-px bg-[#F5F0EC]" />
        <span className="block w-4 h-px bg-[#FF2B2B]" />
      </button>
    </nav>
  );
}
