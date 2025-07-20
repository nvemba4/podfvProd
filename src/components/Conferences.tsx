import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import "swiper/css";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const conferences = [
  {
    background: "/images/conf-1.jpg",
    date: "13,14 de Novembro de 2024",
    targetDate: new Date("2024-11-13T00:00:00"),
    title: ["Marque na", "sua Agenda"],
  },
  {
    background: "/images/10497830.jpg",
    date: "20 de Dezembro de 2024",
    targetDate: new Date("2024-12-20T00:00:00"),
    title: ["Grande Conferência", "de Fim de Ano"],
  },
  {
    background: "/images/prayers.jpg",
    date: "10 de Janeiro de 2025",
    targetDate: new Date("2025-01-10T00:00:00"),
    title: ["Evento Especial", "Ano Novo"],
  },
  // Add more conference objects here if needed
];

function useCountdown(targetDate: Date) {
  const getTimeRemaining = () => {
    const total = targetDate.getTime() - new Date().getTime();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
  };
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  return timeLeft;
}

const Conferences = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timeLeft = useCountdown(conferences[currentSlide].targetDate);
  const swiperRef = useRef<any>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Participation states
  const [participationOpen, setParticipationOpen] = useState(false);
  const [participationSuccess, setParticipationSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    church: '',
    expectations: '',
    dietaryRestrictions: '',
    specialNeeds: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleParticipation = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success
    setParticipationSuccess(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setParticipationSuccess(false);
      setParticipationOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        church: '',
        expectations: '',
        dietaryRestrictions: '',
        specialNeeds: ''
      });
    }, 3000);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 pb-10 pt-8">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <span className="block w-6 h-0.5 bg-red-500"></span>
          <span className="text-red-500 font-semibold text-sm">FAÇA PARTE</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mt-1">EVENTOS</h2>
      </div>
      <div
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Swiper
          ref={swiperRef}
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onSlideChange={swiper => setCurrentSlide(swiper.realIndex)}
        >
          {conferences.map((conf, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full min-h-[220px] md:min-h-[400px] rounded-lg overflow-hidden">
                <img
                  src={conf.background}
                  alt={conf.title.join(" ")}
                  className="absolute inset-0 w-full h-full object-cover object-center z-0"
                  style={{ minHeight: 220, maxHeight: 600 }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
                <div className="relative z-20 flex flex-col items-center justify-center w-full h-full min-h-full flex-1 text-white text-center px-1 md:px-4 md:pt-24  pt-8">
                  <div className="text-base md:text-xl font-medium mb-2">{conf.date}</div>
                  
                  {/* Countdown Timer - only render on client to avoid hydration error */}
                  {mounted && idx === currentSlide && (
                    <div className="flex justify-center gap-3 md:gap-6 mb-6">
                      <div>
                        <div className="text-xl md:text-4xl font-bold">{timeLeft.days}</div>
                        <div className="text-xs md:text-base font-medium mt-1">Dias</div>
                      </div>
                      <div>
                        <div className="text-xl md:text-4xl font-bold">{timeLeft.hours}</div>
                        <div className="text-xs md:text-base font-medium mt-1">Horas</div>
                      </div>
                      <div>
                        <div className="text-xl md:text-4xl font-bold">{timeLeft.minutes}</div>
                        <div className="text-xs md:text-base font-medium mt-1">Minutos</div>
                      </div>
                      <div>
                        <div className="text-xl md:text-4xl font-bold">{timeLeft.seconds}</div>
                        <div className="text-xs md:text-base font-medium mt-1">Segundos</div>
                      </div>
                    </div>
                  )}
                  <Dialog open={participationOpen} onOpenChange={setParticipationOpen}>
                    <DialogTrigger asChild>
                      <button className="bg-white/20 border border-white text-white hover:bg-red-500 hover:border-red-500 hover:text-white font-semibold px-4 md:px-8 py-2 md:py-3 rounded-full mt-2 mb-4 text-base md:text-lg shadow-lg transition">
                        PARTICIPAR
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                      <DialogHeader className="pb-4">
                        <DialogTitle>Inscrição para {conf.title.join(" ")}</DialogTitle>
                        <DialogDescription>
                          Preencha o formulário abaixo para se inscrever no evento.
                        </DialogDescription>
                      </DialogHeader>
                      
                      {!participationSuccess ? (
                        <div className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="name" className="text-sm">Nome Completo *</Label>
                              <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                placeholder="Seu nome completo"
                                required
                                className="h-9"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="email" className="text-sm">Email *</Label>
                              <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                placeholder="seu@email.com"
                                required
                                className="h-9"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="phone" className="text-sm">Telefone</Label>
                              <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="+244 123 456 789"
                                className="h-9"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="age" className="text-sm">Idade</Label>
                              <Input
                                id="age"
                                type="number"
                                value={formData.age}
                                onChange={(e) => handleInputChange('age', e.target.value)}
                                placeholder="25"
                                min="1"
                                max="120"
                                className="h-9"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor="church" className="text-sm">Igreja</Label>
                            <Input
                              id="church"
                              value={formData.church}
                              onChange={(e) => handleInputChange('church', e.target.value)}
                              placeholder="Nome da sua igreja"
                              className="h-9"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="expectations" className="text-sm">O que espera deste evento?</Label>
                            <Textarea
                              id="expectations"
                              value={formData.expectations}
                              onChange={(e) => handleInputChange('expectations', e.target.value)}
                              placeholder="Compartilhe suas expectativas..."
                              rows={2}
                              className="resize-none"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="dietaryRestrictions" className="text-sm">Restrições Alimentares</Label>
                              <Input
                                id="dietaryRestrictions"
                                value={formData.dietaryRestrictions}
                                onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                                placeholder="Ex: Vegetariano"
                                className="h-9"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="specialNeeds" className="text-sm">Necessidades Especiais</Label>
                              <Input
                                id="specialNeeds"
                                value={formData.specialNeeds}
                                onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                                placeholder="Ex: Acessibilidade"
                                className="h-9"
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                          <h3 className="text-lg font-semibold text-green-600 mb-2">Inscrição Confirmada!</h3>
                          <p className="text-gray-600 text-sm">
                            Sua inscrição para &quot;{conf.title.join(' ')}&quot; foi realizada com sucesso. 
                            Você receberá um email de confirmação em breve.
                          </p>
                        </div>
                      )}
                      
                      <DialogFooter className="pt-4">
                        {!participationSuccess ? (
                          <>
                            <DialogClose asChild>
                              <Button variant="outline" size="sm">Cancelar</Button>
                            </DialogClose>
                            <Button 
                              onClick={handleParticipation}
                              disabled={isSubmitting || !formData.name || !formData.email}
                              className="bg-[#e94d2c] hover:bg-[#d13d1c]"
                              size="sm"
                            >
                              {isSubmitting ? 'Enviando...' : 'Confirmar Inscrição'}
                            </Button>
                          </>
                        ) : (
                          <DialogClose asChild>
                            <Button className="bg-[#e94d2c] hover:bg-[#d13d1c]" size="sm">
                              Fechar
                            </Button>
                          </DialogClose>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                {/* Left Arrow */}
                <button
                  className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full transition bg-white/0 hover:bg-white/70 hover:text-red-500 text-white border border-white/30 shadow-lg ${isHovered ? 'bg-white/30' : 'bg-white/0'}`}
                  style={{ opacity: isHovered ? 1 : 0, pointerEvents: isHovered ? 'auto' : 'none' }}
                  aria-label="Anterior"
                  onClick={() => swiperRef.current?.swiper?.slidePrev()}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                {/* Right Arrow */}
                <button
                  className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full transition bg-white/0 hover:bg-white/70 hover:text-red-500 text-white border border-white/30 shadow-lg ${isHovered ? 'bg-white/30' : 'bg-white/0'}`}
                  style={{ opacity: isHovered ? 1 : 0, pointerEvents: isHovered ? 'auto' : 'none' }}
                  aria-label="Próximo"
                  onClick={() => swiperRef.current?.swiper?.slideNext()}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Conferences; 