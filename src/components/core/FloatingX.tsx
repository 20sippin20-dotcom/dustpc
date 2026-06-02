"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const positions = [
  { top: "12%", left: "8%", size: 24, delay: 0, opacity: 0.12 },
  { top: "20%", right: "6%", size: 36, delay: 0.5, opacity: 0.08 },
  { top: "45%", left: "4%", size: 18, delay: 1.2, opacity: 0.15 },
  { top: "60%", right: "10%", size: 28, delay: 0.8, opacity: 0.1 },
  { top: "78%", left: "12%", size: 20, delay: 1.8, opacity: 0.12 },
  { top: "88%", right: "5%", size: 32, delay: 0.3, opacity: 0.07 },
  { top: "35%", left: "92%", size: 16, delay: 2.1, opacity: 0.14 },
  { top: "70%", left: "88%", size: 22, delay: 1.0, opacity: 0.09 },
];

function XSymbol({
  size,
  opacity,
  delay,
  style,
}: {
  size: number;
  opacity: number;
  delay: number;
  style: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, scale: 0, rotation: -20 },
      {
        opacity,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        delay: delay + 3,
        ease: "elastic.out(1, 0.6)",
      }
    );

    gsap.to(el, {
      y: `random(-20, 20)`,
      rotation: `random(-15, 15)`,
      duration: `random(4, 8)`,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay + 3,
    });
  }, [opacity, delay]);

  return (
    <div
      ref={ref}
      className="absolute pointer-events-none select-none"
      style={{ ...style, opacity: 0 }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FF2B2B"
        strokeWidth="2.5"
        strokeLinecap="square"
      >
        <line x1="2" y1="2" x2="22" y2="22" />
        <line x1="22" y1="2" x2="2" y2="22" />
      </svg>
    </div>
  );
}

export default function FloatingX() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      {positions.map((pos, i) => {
        const { top, left, right, size, delay, opacity } = pos as {
          top: string;
          left?: string;
          right?: string;
          size: number;
          delay: number;
          opacity: number;
        };
        return (
          <XSymbol
            key={i}
            size={size}
            opacity={opacity}
            delay={delay}
            style={{ top, left, right }}
          />
        );
      })}
    </div>
  );
}
