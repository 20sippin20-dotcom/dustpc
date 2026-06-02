"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BOOKING_URL =
  process.env.NEXT_PUBLIC_LANGAME_BOOKING_URL ??
  "https://langame.ru/computerniy_club_uhta";

const steps = [
  "Выберите зону: STANDART / VIP / TV",
  "Укажите дату и время в LANGAME",
  "Подтвердите и оплатите бронь онлайн",
];

export default function OnlineBooking() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 82%",
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="bg-[#0A0A0A] py-24 md:py-32 px-6 md:px-10"
      aria-label="Онлайн бронирование"
    >
      <div ref={titleRef} className="opacity-0 mb-12 md:mb-16">
        <p className="font-body text-xs tracking-[0.3em] text-[#FF2B2B] uppercase mb-4">
          — ONLINE / LANGAME
        </p>
        <h2 className="font-display text-[16vw] sm:text-[12vw] md:text-[9vw] leading-[0.92] text-[#F5F0EC] uppercase break-words">
          ОНЛАЙН
          <br />
          БРОНИРОВАНИЕ
        </h2>
      </div>

      <div
        ref={contentRef}
        className="opacity-0 grid grid-cols-1 xl:grid-cols-[1.25fr_0.75fr] gap-5"
      >
        <div className="border border-white/15 rounded-[1.8rem] bg-[#0f1015] p-6 md:p-10">
          <p className="font-body text-sm md:text-base text-[#F5F0EC]/65 mb-8 max-w-xl leading-relaxed">
            Бронирование мест в DUST доступно через LANGAME. Нажмите кнопку
            ниже, чтобы открыть официальный модуль и забронировать ПК/TV.
          </p>

          <div className="space-y-3 mb-10">
            {steps.map((step, i) => (
              <div
                key={step}
                className="flex items-center gap-3 border border-white/10 rounded-xl px-4 py-3"
              >
                <span className="w-6 h-6 rounded-full bg-[#FF2B2B] text-[#F5F0EC] font-body text-xs flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="font-body text-sm text-[#F5F0EC]/85">
                  {step}
                </span>
              </div>
            ))}
          </div>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[#FF2B2B] bg-[#FF2B2B] text-[#F5F0EC] px-6 md:px-8 py-3 font-body text-[11px] tracking-[0.18em] uppercase hover:bg-[#0A0A0A] hover:text-[#FF2B2B] transition-all duration-300"
          >
            ЗАБРОНИРОВАТЬ ЧЕРЕЗ LANGAME
          </a>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="ml-0 md:ml-3 mt-3 md:mt-0 inline-flex items-center justify-center rounded-full border border-[#F5F0EC]/30 text-[#F5F0EC]/85 px-6 md:px-8 py-3 font-body text-[11px] tracking-[0.18em] uppercase hover:border-[#F5F0EC] hover:text-[#F5F0EC] transition-all duration-300"
          >
            ОТКРЫТЬ БРОНЬ НА САЙТЕ
          </button>
        </div>

        <div className="border border-white/15 rounded-[1.8rem] bg-[#0f1015] p-6 md:p-8">
          <p className="font-body text-xs tracking-[0.24em] text-[#FF2B2B] uppercase mb-5">
            БЫСТРЫЙ ВЫБОР
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3 mb-6">
            <div className="border border-white/10 rounded-xl p-4 bg-black/20">
              <p className="font-body text-[10px] tracking-[0.18em] text-white/35 uppercase mb-2">
                ЗОНА
              </p>
              <p className="font-display text-2xl text-[#F5F0EC] uppercase leading-none">
                Standart
              </p>
            </div>
            <div className="border border-white/10 rounded-xl p-4 bg-black/20">
              <p className="font-body text-[10px] tracking-[0.18em] text-white/35 uppercase mb-2">
                ЗОНА
              </p>
              <p className="font-display text-2xl text-[#F5F0EC] uppercase leading-none">
                VIP
              </p>
            </div>
            <div className="border border-white/10 rounded-xl p-4 bg-black/20">
              <p className="font-body text-[10px] tracking-[0.18em] text-white/35 uppercase mb-2">
                ЗОНА
              </p>
              <p className="font-display text-2xl text-[#F5F0EC] uppercase leading-none">
                TV
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between border border-white/10 rounded-xl px-4 py-3">
              <span className="font-body text-xs text-[#F5F0EC]/60 uppercase tracking-[0.15em]">
                Онлайн запись
              </span>
              <span className="font-body text-xs text-[#FF2B2B] uppercase tracking-[0.18em]">
                Активна 24/7
              </span>
            </div>
            <div className="flex items-center justify-between border border-white/10 rounded-xl px-4 py-3">
              <span className="font-body text-xs text-[#F5F0EC]/60 uppercase tracking-[0.15em]">
                Предоплата
              </span>
              <span className="font-body text-xs text-[#F5F0EC]/80 uppercase tracking-[0.18em]">
                Через LANGAME
              </span>
            </div>
            <div className="flex items-center justify-between border border-white/10 rounded-xl px-4 py-3">
              <span className="font-body text-xs text-[#F5F0EC]/60 uppercase tracking-[0.15em]">
                Поддержка
              </span>
              <span className="font-body text-xs text-[#F5F0EC]/80 uppercase tracking-[0.18em]">
                VK / Telegram
              </span>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[140] bg-black/75 backdrop-blur-sm p-4 md:p-6">
          <div className="mx-auto w-full max-w-6xl h-[92vh] bg-[#0D0E12] border border-white/15 rounded-2xl overflow-hidden flex flex-col">
            <div className="h-14 px-4 md:px-6 border-b border-white/10 flex items-center justify-between">
              <p className="font-body text-xs md:text-sm tracking-[0.15em] text-[#F5F0EC]/80 uppercase">
                Онлайн бронирование DUST x LANGAME
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full border border-white/20 text-[#F5F0EC]/75 hover:text-[#F5F0EC] hover:border-white/50 transition-all"
                aria-label="Закрыть окно бронирования"
              >
                ×
              </button>
            </div>

            <div className="flex-1 bg-[#090A0E]">
              <iframe
                src={BOOKING_URL}
                title="LANGAME booking widget"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
