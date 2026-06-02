"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.35,
  onClick,
  href,
  target,
  rel,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const maxOffset = 8;
    const offsetX = Math.max(-maxOffset, Math.min(maxOffset, x * strength * 0.18));
    const offsetY = Math.max(-maxOffset, Math.min(maxOffset, y * strength * 0.18));

    gsap.to(el, {
      x: offsetX,
      y: offsetY,
      scale: 1.01,
      duration: 0.16,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(containerRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const Tag = href ? "a" : "div";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block relative rounded-full"
      style={{ willChange: "transform" }}
    >
      <Tag
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={className}
      >
        <div style={{ willChange: "transform" }}>{children}</div>
      </Tag>
    </div>
  );
}
