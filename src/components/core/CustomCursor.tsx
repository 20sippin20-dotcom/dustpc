"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible.current) {
        isVisible.current = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: "none",
      });
    };

    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
      isVisible.current = false;
    };

    const onEnterInteractive = () => {
      gsap.to(dot, { scale: 0.4, duration: 0.3, ease: "power2.out" });
      gsap.to(ring, {
        scale: 2.2,
        borderColor: "#FF2B2B",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onLeaveInteractive = () => {
      gsap.to(dot, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
      gsap.to(ring, {
        scale: 1,
        borderColor: "#FF2B2B",
        duration: 0.4,
        ease: "elastic.out(1, 0.5)",
      });
    };

    const loop = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX, y: ringY });
      requestAnimationFrame(loop);
    };

    const raf = requestAnimationFrame(loop);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    const interactives = document.querySelectorAll(
      "a, button, [data-cursor]"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#FF2B2B] rounded-full pointer-events-none z-[10000] opacity-0 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-[#FF2B2B] rounded-full pointer-events-none z-[10000] opacity-0 -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
