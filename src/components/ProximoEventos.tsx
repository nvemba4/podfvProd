import React from "react";
import { Calendar, MapPin, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "../styles/swiper.css";

type ProximoEventoCard = {
  title: string;
  description: string;
  category: string;
  image: string;
};

const ProximoEventos: React.FC = () => {
  const router = useRouter();
  const [mainCards, setMainCards] = React.useState<ProximoEventoCard[]>([]);
  const [col3Cards, setCol3Cards] = React.useState<ProximoEventoCard[]>([]);
  const swiperRef = React.useRef<any>(null);
  const categoryColors: Record<string, string> = {
    Podcast: "text-red-500",
    Solidariedade: "text-pink-500",
    Fé: "text-yellow-600",
    Evento: "text-red-500",
    Conferência: "text-blue-600",
    Workshop: "text-green-600",
    Culto: "text-purple-600",
    Retiro: "text-orange-600",
    Seminário: "text-indigo-600",
    Encontro: "text-teal-600",
    Oração: "text-rose-600",
  };

  React.useEffect(() => {
    fetch("/api/proeventos/mainCards")
      .then((res) => res.json())
      .then(setMainCards);
    fetch("/api/proeventos/col3Cards")
      .then((res) => res.json())
      .then(setCol3Cards);
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 pb-10 pt-8">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <span className="block w-6 h-0.5 bg-red-500"></span>
          <button 
            onClick={() => router.push('/proximos-eventos')}
            className="text-red-500 font-semibold text-sm hover:underline uppercase cursor-pointer"
          >
            VER MAIS
          </button>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mt-1">PRÓXIMOS EVENTOS</h2>
      </div>
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: '.proximos-eventos-prev',
            nextEl: '.proximos-eventos-next',
          }}
          pagination={{ clickable: true }}
          spaceBetween={32}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="w-full"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {mainCards.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div 
                className="flex flex-col cursor-pointer hover:shadow-lg transition-shadow bg-white rounded-xl overflow-hidden"
                onClick={() => router.push(`/proximos-eventos?id=${idx + 1}`)}
              >
                <div className="w-full bg-gray-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="px-6 py-4">
                  <span className={`block font-semibold mb-1 text-sm ${categoryColors[item.category] || "text-red-500"}`}>
                    {item.category}
                  </span>
                  <h3 className="text-lg font-medium leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-8 mt-3">
                    <span className="flex items-center text-red-500 font-semibold text-sm">
                      <Calendar className="w-4 h-4 mr-1" /> 17/06
                    </span>
                    <span className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" /> Luanda
                    </span>
                    <span className="flex items-center text-gray-600 text-sm">
                      <Wallet className="w-4 h-4 mr-1" /> Luanda
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Navigation Arrows */}
        <div className="absolute right-8 bottom-0 flex flex-row gap-3 z-10 pb-4">
          <button
            className="proximos-eventos-prev rounded-full bg-red-600 text-white p-2 shadow transition hover:bg-red-700 disabled:opacity-50"
            aria-label="Anterior"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            className="proximos-eventos-next rounded-full bg-red-600 text-white p-2 shadow transition hover:bg-red-700 disabled:opacity-50"
            aria-label="Próximo"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProximoEventos; 