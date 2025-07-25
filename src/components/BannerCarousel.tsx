'use client';

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "../styles/swiper.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Type for a slide
type BannerSlide = {
  bg: string;
  title: string;
  subtitle: string;
  description: string;
  button: string;
  buttonLink: string;
  videoId: string; // Added videoId to the type
};

export default function BannerCarousel() {
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/banner-carousel")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setSlides(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!slides.length) return <div>Nenhum slide encontrado.</div>;

  return (
    <div className="w-screen mt-28">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full h-[480px] md:h-[600px]"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="relative w-full h-[480px] md:h-[600px] flex items-center justify-start bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.bg})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 pointer-events-none" />
              {/* Content */}
              <div className="relative z-10 max-w-2xl pl-8 md:pl-20 text-left text-white pointer-events-auto">
                <div className="mb-2 text-red-500 font-semibold tracking-wide text-sm md:text-base">
                  {slide.subtitle}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                  {slide.title}
                </h2>
                <p className="mb-6 text-base md:text-lg font-light">
                  {slide.description}
                </p>
                <button
                  type="button"
                  onClick={() => router.push(`/episodio?videoId=${slide.videoId}`)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-full font-bold text-white text-lg shadow-lg transition z-20 mt-8 border-4 border-white border-opacity-40"
                  style={{ position: 'relative', zIndex: 20, marginTop: '2rem', boxShadow: '0 6px 24px rgba(0,0,0,0.25)' }}
                >
                  <span className="text-2xl">▶</span> {slide.button}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
} 