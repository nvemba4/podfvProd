"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { mockEpisodes } from "@/mock/episodiosRecentesData";
import Image from "next/image";

export interface MainBannerHeaderSlide {
  backgroundImage: string;
  title: string;
  subtitle: string;
  promoText: string;
  promoButtonText: string;
  location?: string;
  extra?: string;
  description?: string;
  button?: string;
  buttonLink?: string;
  videoId?: string; // Add videoId for navigation
}

interface MainBannerHeader {
  slides: MainBannerHeaderSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const FADE_DURATION = 600; // ms

const slides = mockEpisodes.map((ep) => ({
  backgroundImage: ep.image,
  title: ep.title,
  subtitle: '',
  promoText: '',
  promoButtonText: '',
  description: ep.description,
  button: 'ASSISTIR AGORA!',
  videoId: ep.idVideo,
  id: ep.id,
}));

const MainBannerHeader: React.FC<MainBannerHeader> = ({
  autoPlay = true,
  autoPlayInterval = 8000,
}) => {
  const [current, setCurrent] = React.useState(0);
  const totalSlides = slides.length;
  const router = useRouter();

  // Auto-advance
  React.useEffect(() => {
    if (!autoPlay || totalSlides <= 1) return;
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % totalSlides);
    }, autoPlayInterval);
    return () => clearTimeout(timer);
  }, [current, autoPlay, autoPlayInterval, totalSlides]);

  const handlePrev = () => setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  const handleNext = () => setCurrent((prev) => (prev + 1) % totalSlides);

  const slide = slides[current];

  return (
    <div className="w-full relative md:mt-11 min-h-[350px]  lg:min-h-[660px] flex flex-col justify-end group overflow-hidden">
      {/* Fade background images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', width: '100%', height: '100%' }}
        >
          <Image
            src={s.backgroundImage}
            alt={s.title}
            fill
            style={{ objectFit: 'cover' }}
            priority={i === 0}
            quality={100}
            sizes="(max-width: 768px) 100vw, 100vw"
          />
        </div>
      ))}
      {/* Gradient Overlay (like ExploreShoppings) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-gray-800/30 z-20 pointer-events-none" />
      {/* Content */}
      <div className="relative z-10 pb-8 max-w-2xl pl-8 md:pl-20 text-left text-white pointer-events-auto">
                <div className="mb-2 text-red-500 font-semibold tracking-wide text-sm md:text-base">
                  {slide.title}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                  {slide.subtitle}
                </h2>
                <p className="mb-6 text-base md:text-lg font-light">
                  {slide.description}
                </p>
                <button
                  type="button"
                  onClick={() => router.push(`/episodioRecentes?ep=${slide.id}&idVideo=${slide.videoId}`)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-full font-bold text-white text-lg shadow-lg transition z-20 mt-8 border-4 border-white border-opacity-40"
                  style={{ position: 'relative', zIndex: 20, marginTop: '2rem', boxShadow: '0 6px 24px rgba(0,0,0,0.25)' }}
                >
                  <span className="text-2xl">▶</span> {slide.button}
                </button>
              </div>
      {/* Dots */}
      {totalSlides > 1 && (
        <div className="flex gap-2 justify-center absolute left-1/2 -translate-x-1/2 bottom-4 z-40">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full ${i === current ? 'bg-white' : 'bg-white/50'} inline-block`}
              onClick={() => setCurrent(i)}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      )}
      {/* Navigation Arrows */}
      {totalSlides > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white text-gray-800 rounded-full p-2 shadow z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={handlePrev}
            aria-label="Anterior"
          >
            {/* Left Arrow Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white text-gray-800 rounded-full p-2 shadow z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={handleNext}
            aria-label="Próximo"
          >
            {/* Right Arrow Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export default MainBannerHeader; 