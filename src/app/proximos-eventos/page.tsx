'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Facebook, Instagram, MessageCircle, Heart, Calendar, MapPin, Wallet, Clock, Users, Share2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Mock data for upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Detox da Alma",
    description: "Este evento irá abordar os desafios e oportunidades de se mudar para uma cidade grande. Participe para aprender e compartilhar experiências! Venha conosco para uma jornada de transformação espiritual e renovação interior.",
    category: "Podcast",
    image: "/images/chindinma.png",
    date: "17/06/2024",
    time: "19:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 150,
    registered: 89,
    tags: ["Espiritualidade", "Transformação", "Renovação"],
    relatedEvents: [2, 3, 4],
    longDescription: "O Detox da Alma é um evento especial que visa proporcionar um momento de reflexão e renovação espiritual. Durante este encontro, abordaremos temas como: limpeza espiritual, renovação da mente, e fortalecimento da fé. Será um momento único de conexão com Deus e com outros participantes que buscam o mesmo objetivo de transformação interior."
  },
  {
    id: 2,
    title: "Melhores suportando mulheres",
    description: "Descubra maneiras práticas de exercer a solidariedade em sua comunidade neste evento especial.",
    category: "Solidariedade",
    image: "/images/workshopmulheres.png",
    date: "20/06/2024",
    time: "14:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 100,
    registered: 67,
    tags: ["Solidariedade", "Mulheres", "Comunidade"],
    relatedEvents: [1, 3, 4],
    longDescription: "Este evento especial foca no empoderamento e apoio às mulheres através da solidariedade. Vamos discutir como criar redes de apoio, desenvolver projetos comunitários e fortalecer os laços entre mulheres que buscam fazer a diferença em suas comunidades."
  },
  {
    id: 3,
    title: "Testemunhos no Podfé",
    description: "Um bate-papo inspirador sobre fé, transformação e crescimento pessoal em sua comunidade neste evento especial.",
    category: "Podcast",
    image: "/images/Cantoraovivo.png",
    date: "25/06/2024",
    time: "20:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 200,
    registered: 156,
    tags: ["Testemunhos", "Fé", "Inspiração"],
    relatedEvents: [1, 2, 4],
    longDescription: "Neste evento especial, você terá a oportunidade de ouvir testemunhos inspiradores de pessoas que passaram por transformações significativas em suas vidas através da fé. Histórias reais que mostram o poder de Deus em ação e como a fé pode transformar qualquer situação."
  },
  {
    id: 4,
    title: "Encontro de Mulheres de Fé",
    description: "Um evento especial para mulheres que buscam fortalecer sua fé e construir relacionamentos significativos em comunidade.",
    category: "Encontro",
    image: "/images/workshopmulheres.png",
    date: "30/06/2024",
    time: "15:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 120,
    registered: 98,
    tags: ["Mulheres", "Fé", "Comunidade"],
    relatedEvents: [1, 2, 3],
    longDescription: "Um encontro especial dedicado às mulheres que desejam fortalecer sua fé e construir relacionamentos significativos. Durante este evento, teremos momentos de adoração, estudo bíblico, compartilhamento e networking entre mulheres que compartilham os mesmos valores e objetivos espirituais."
  },
  {
    id: 5,
    title: "Conferência de Jovens",
    description: "Um evento dinâmico para jovens que desejam crescer na fé e desenvolver seus dons e talentos.",
    category: "Conferência",
    image: "/images/conf-1.jpg",
    date: "05/07/2024",
    time: "18:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 300,
    registered: 245,
    tags: ["Jovens", "Desenvolvimento", "Talentos"],
    relatedEvents: [6, 7, 8],
    longDescription: "Uma conferência especial para jovens que desejam crescer na fé e desenvolver seus dons e talentos. Durante este evento, teremos palestras inspiradoras, workshops práticos, momentos de adoração e networking entre jovens que compartilham a mesma paixão por servir a Deus."
  },
  {
    id: 6,
    title: "Workshop de Liderança",
    description: "Aprenda princípios bíblicos de liderança e como aplicar em sua vida pessoal e profissional.",
    category: "Workshop",
    image: "/images/conf-3.jpg",
    date: "08/07/2024",
    time: "09:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 80,
    registered: 72,
    tags: ["Liderança", "Desenvolvimento", "Profissional"],
    relatedEvents: [5, 7, 9],
    longDescription: "Um workshop prático sobre liderança baseada em princípios bíblicos. Aprenda como ser um líder eficaz em sua família, trabalho e comunidade, desenvolvendo habilidades de comunicação, tomada de decisão e influência positiva."
  },
  {
    id: 7,
    title: "Culto de Adoração",
    description: "Venha participar de um momento especial de adoração e louvor com a comunidade Podfé.",
    category: "Culto",
    image: "/images/prayers.jpg",
    date: "12/07/2024",
    time: "19:30",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 500,
    registered: 423,
    tags: ["Adoração", "Louvor", "Comunidade"],
    relatedEvents: [8, 9, 10],
    longDescription: "Um momento especial de adoração e louvor onde toda a comunidade Podfé se reúne para celebrar a presença de Deus. Com música inspiradora, orações e testemunhos, este será um tempo de renovação espiritual e fortalecimento da fé."
  },
  {
    id: 8,
    title: "Retiro Espiritual",
    description: "Um fim de semana dedicado ao fortalecimento espiritual e renovação da fé.",
    category: "Retiro",
    image: "/images/conf.jpg",
    date: "15/07/2024",
    time: "08:00",
    location: "Benguela",
    price: "50.000 Kz",
    organizer: "Podfé",
    capacity: 60,
    registered: 58,
    tags: ["Retiro", "Espiritualidade", "Renovação"],
    relatedEvents: [7, 9, 11],
    longDescription: "Um retiro de fim de semana em um local tranquilo, dedicado ao fortalecimento espiritual e renovação da fé. Com programação especial incluindo momentos de oração, estudo bíblico, comunhão e descanso na presença de Deus."
  },
  {
    id: 9,
    title: "Seminário de Casamento",
    description: "Um evento especial para casais que desejam fortalecer seu relacionamento baseado em princípios bíblicos.",
    category: "Seminário",
    image: "/images/TudosobreCasamento.png",
    date: "20/07/2024",
    time: "14:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 100,
    registered: 89,
    tags: ["Casamento", "Relacionamento", "Família"],
    relatedEvents: [8, 10, 12],
    longDescription: "Um seminário especial para casais que desejam fortalecer seu relacionamento baseado em princípios bíblicos. Aprenda sobre comunicação, resolução de conflitos, intimidade espiritual e como construir um casamento duradouro e feliz."
  },
  {
    id: 10,
    title: "Encontro de Homens",
    description: "Um espaço para homens compartilharem experiências e crescerem juntos na fé.",
    category: "Encontro",
    image: "/images/ProfetaCastelo.png",
    date: "25/07/2024",
    time: "19:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 150,
    registered: 134,
    tags: ["Homens", "Fé", "Comunhão"],
    relatedEvents: [9, 11, 13],
    longDescription: "Um espaço especial para homens compartilharem experiências, desafios e vitórias, crescendo juntos na fé. Um momento de comunhão, oração e encorajamento mútuo para homens que desejam ser líderes espirituais em suas famílias e comunidades."
  },
  {
    id: 11,
    title: "Workshop de Música",
    description: "Aprenda técnicas de música e adoração para servir melhor na igreja e na comunidade.",
    category: "Workshop",
    image: "/images/Cantoraovivo.png",
    date: "30/07/2024",
    time: "10:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 50,
    registered: 47,
    tags: ["Música", "Adoração", "Arte"],
    relatedEvents: [10, 12, 14],
    longDescription: "Um workshop prático para músicos e adoradores que desejam aprimorar suas habilidades e servir melhor na igreja e na comunidade. Aprenda técnicas vocais, instrumentais e como liderar momentos de adoração com excelência."
  },
  {
    id: 12,
    title: "Conferência de Família",
    description: "Um evento completo para toda a família, com atividades para crianças, jovens e adultos.",
    category: "Conferência",
    image: "/images/piquenique.jpeg",
    date: "05/08/2024",
    time: "09:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 400,
    registered: 378,
    tags: ["Família", "Crianças", "Comunidade"],
    relatedEvents: [11, 13, 15],
    longDescription: "Uma conferência especial para toda a família, com programação completa incluindo atividades para crianças, jovens e adultos. Um momento de fortalecimento dos laços familiares e crescimento espiritual conjunto."
  },
  {
    id: 13,
    title: "Encontro de Oração",
    description: "Uma noite especial de oração e intercessão pela cidade e pela nação.",
    category: "Oração",
    image: "/images/prayers.jpg",
    date: "10/08/2024",
    time: "20:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 200,
    registered: 189,
    tags: ["Oração", "Intercessão", "Nação"],
    relatedEvents: [12, 14, 16],
    longDescription: "Uma noite especial dedicada à oração e intercessão pela cidade de Luanda e pela nação angolana. Um momento de clamor coletivo pela transformação espiritual e social do nosso país."
  },
  {
    id: 14,
    title: "Workshop de Evangelismo",
    description: "Aprenda técnicas e estratégias para compartilhar o evangelho de forma efetiva.",
    category: "Workshop",
    image: "/images/conf-1.jpg",
    date: "15/08/2024",
    time: "14:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 80,
    registered: 76,
    tags: ["Evangelismo", "Missão", "Compartilhamento"],
    relatedEvents: [13, 15, 17],
    longDescription: "Um workshop prático sobre evangelismo e missão, ensinando técnicas e estratégias para compartilhar o evangelho de forma efetiva e amorosa. Aprenda como ser um testemunho vivo de Cristo em sua comunidade."
  },
  {
    id: 15,
    title: "Conferência de Mulheres",
    description: "Um evento especial para mulheres de todas as idades, com palestras, workshops e networking.",
    category: "Conferência",
    image: "/images/workshopmulheres.png",
    date: "20/08/2024",
    time: "09:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 300,
    registered: 287,
    tags: ["Mulheres", "Empoderamento", "Networking"],
    relatedEvents: [14, 16, 18],
    longDescription: "Uma conferência especial para mulheres de todas as idades, com palestras inspiradoras, workshops práticos e momentos de networking. Um evento para fortalecer, empoderar e conectar mulheres que desejam fazer a diferença."
  },
  {
    id: 16,
    title: "Encontro de Adolescentes",
    description: "Um espaço divertido e seguro para adolescentes crescerem na fé e fazerem novos amigos.",
    category: "Encontro",
    image: "/images/student.jpeg",
    date: "25/08/2024",
    time: "15:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 120,
    registered: 108,
    tags: ["Adolescentes", "Amizade", "Crescimento"],
    relatedEvents: [15, 17, 19],
    longDescription: "Um espaço divertido e seguro para adolescentes crescerem na fé e fazerem novos amigos. Com atividades dinâmicas, jogos, música e momentos de reflexão, este encontro é perfeito para jovens que desejam fortalecer sua identidade em Cristo."
  },
  {
    id: 17,
    title: "Workshop de Finanças",
    description: "Aprenda princípios bíblicos de administração financeira e como aplicar em sua vida.",
    category: "Workshop",
    image: "/images/conf-3.jpg",
    date: "30/08/2024",
    time: "10:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 60,
    registered: 54,
    tags: ["Finanças", "Administração", "Bíblico"],
    relatedEvents: [16, 18, 20],
    longDescription: "Um workshop sobre administração financeira baseada em princípios bíblicos. Aprenda sobre dízimos, ofertas, investimentos, poupança e como ser um bom mordomo dos recursos que Deus confiou a você."
  },
  {
    id: 18,
    title: "Culto de Celebração",
    description: "Uma celebração especial com música, dança e testemunhos de transformação.",
    category: "Culto",
    image: "/images/Cantoraovivo.png",
    date: "05/09/2024",
    time: "19:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 600,
    registered: 523,
    tags: ["Celebração", "Música", "Testemunhos"],
    relatedEvents: [17, 19, 21],
    longDescription: "Uma celebração especial com música, dança e testemunhos de transformação. Um momento de alegria e gratidão onde toda a comunidade celebra as vitórias e milagres que Deus tem realizado em nossas vidas."
  },
  {
    id: 19,
    title: "Seminário de Paternidade",
    description: "Um evento para pais e mães aprenderem princípios bíblicos de criação de filhos.",
    category: "Seminário",
    image: "/images/TudosobreCasamento.png",
    date: "10/09/2024",
    time: "14:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 100,
    registered: 89,
    tags: ["Paternidade", "Família", "Educação"],
    relatedEvents: [18, 20, 22],
    longDescription: "Um seminário especial para pais e mães aprenderem princípios bíblicos de criação de filhos. Aprenda sobre disciplina com amor, comunicação efetiva, desenvolvimento emocional e como ser um exemplo de fé para seus filhos."
  },
  {
    id: 20,
    title: "Encontro de Idosos",
    description: "Um momento especial para a terceira idade compartilhar experiências e sabedoria.",
    category: "Encontro",
    image: "/images/ProfetaCastelo.png",
    date: "15/09/2024",
    time: "14:00",
    location: "Luanda",
    price: "Gratuito",
    organizer: "Podfé",
    capacity: 80,
    registered: 76,
    tags: ["Idosos", "Sabedoria", "Experiência"],
    relatedEvents: [19, 21, 23],
    longDescription: "Um momento especial para a terceira idade compartilhar experiências, sabedoria e testemunhos de uma vida de fé. Um espaço de valorização e reconhecimento da importância dos idosos em nossa comunidade."
  }
];

function ProximosEventosPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
  const [open, setOpen] = React.useState(false);
  const [likedEvents, setLikedEvents] = React.useState<Set<number>>(new Set());
  const [shareUrl, setShareUrl] = React.useState('');
  
  // Registration states
  const [registrationOpen, setRegistrationOpen] = React.useState(false);
  const [registrationSuccess, setRegistrationSuccess] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    church: '',
    expectations: '',
    dietaryRestrictions: '',
    specialNeeds: ''
  });

  React.useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const toggleLike = (eventId: number) => {
    setLikedEvents(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(eventId)) {
        newLiked.delete(eventId);
      } else {
        newLiked.add(eventId);
      }
      return newLiked;
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRegistration = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success
    setRegistrationSuccess(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setRegistrationSuccess(false);
      setRegistrationOpen(false);
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
  
  // If an ID is provided, show the event detail
  if (id) {
    const evento = upcomingEvents.find(e => String(e.id) === id);
    if (!evento) return <div className="text-center py-20">Evento não encontrado.</div>;
    const related = upcomingEvents.filter(e => evento.relatedEvents.includes(e.id) && e.id !== evento.id);

    // Social share URLs
    const shareText = encodeURIComponent(evento.title + ' - ' + evento.description);

    return (
      <div className="min-h-screen bg-[#fdf6ef] flex justify-center py-8 px-2">
        <div className="w-full max-w-4xl bg-white/90 rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 p-8 md:pr-4">
            {/* Hero Image with overlay */}
            <div className="relative overflow-hidden mb-8">
              <img
                src={evento.image}
                alt={evento.title}
                className="w-full h-56 md:h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#fdf6ef] via-transparent to-transparent px-6 py-4">
                <span className="text-[#e94d2c] font-semibold text-base">{evento.category}</span>
                <div className="text-xs text-gray-700 mt-1">{evento.date} às {evento.time} &nbsp;|&nbsp; {evento.organizer}</div>
              </div>
            </div>
            
            {/* Title & Content */}
            <h1 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-gray-900 leading-tight">
              {evento.title}
            </h1>
            
            <div className="text-lg font-serif text-gray-800 mb-6">
              {evento.longDescription}
            </div>
            
            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#fdf1e2] border border-[#f5d6b3] rounded-lg px-6 py-4 text-center text-[#a05a2c]">
                <div className="font-semibold mb-1 flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Data e Hora
                </div>
                <div>{evento.date} às {evento.time}</div>
              </div>
              
              <div className="bg-[#fdf1e2] border border-[#f5d6b3] rounded-lg px-6 py-4 text-center text-[#a05a2c]">
                <div className="font-semibold mb-1 flex items-center justify-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Localização
                </div>
                <div>{evento.location}</div>
              </div>
              
              <div className="bg-[#fdf1e2] border border-[#f5d6b3] rounded-lg px-6 py-4 text-center text-[#a05a2c]">
                <div className="font-semibold mb-1 flex items-center justify-center">
                  <Wallet className="w-4 h-4 mr-2" />
                  Preço
                </div>
                <div>{evento.price}</div>
              </div>
              
              <div className="bg-[#fdf1e2] border border-[#f5d6b3] rounded-lg px-6 py-4 text-center text-[#a05a2c]">
                <div className="font-semibold mb-1 flex items-center justify-center">
                  <Users className="w-4 h-4 mr-2" />
                  Capacidade
                </div>
                <div>{evento.registered}/{evento.capacity} inscritos</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Dialog open={registrationOpen} onOpenChange={setRegistrationOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#e94d2c] hover:bg-[#d13d1c] text-white px-8 py-3 rounded-lg font-semibold">
                    Inscrever-se no Evento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                  <DialogHeader className="pb-4">
                    <DialogTitle>Inscrição para {evento.title}</DialogTitle>
                    <DialogDescription>
                      Preencha o formulário abaixo para se inscrever no evento.
                    </DialogDescription>
                  </DialogHeader>
                  
                  {!registrationSuccess ? (
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
                        Sua inscrição para "{evento.title}" foi realizada com sucesso. 
                        Você receberá um email de confirmação em breve.
                      </p>
                    </div>
                  )}
                  
                  <DialogFooter className="pt-4">
                    {!registrationSuccess ? (
                      <>
                        <DialogClose asChild>
                          <Button variant="outline" size="sm">Cancelar</Button>
                        </DialogClose>
                        <Button 
                          onClick={handleRegistration}
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
              
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="px-8 py-3 rounded-lg font-semibold">
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Compartilhar Evento</DialogTitle>
                    <DialogDescription>
                      Compartilhe este evento nas suas redes sociais
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-4 justify-center">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${shareText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://www.instagram.com/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Fechar</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Back Button */}
            <div className="mb-6">
              <button 
                onClick={() => router.push('/proximos-eventos')}
                className="bg-[#e94d2c] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#d13d1c] transition"
              >
                ← Voltar aos Próximos Eventos
              </button>
            </div>
          </div>
          
          {/* Sidebar */}
          <aside className="w-full md:w-80 bg-[#fcf7f2] border-l border-[#f5e6d6] flex flex-col p-6 gap-8">
            {/* Tags */}
            <div>
              <div className="text-[#e09a4b] font-semibold text-sm mb-2 tracking-wide uppercase">TAGS</div>
              <div className="flex flex-wrap gap-2">
                {evento.tags.map((tag: string) => (
                  <span key={tag} className="bg-[#fdf1e2] text-[#a05a2c] px-3 py-1 rounded-full text-xs font-semibold">{tag}</span>
                ))}
              </div>
            </div>
            
            {/* Related Events */}
            <div>
              <div className="text-[#e94d2c] font-semibold text-sm mb-2 tracking-wide uppercase">EVENTOS RELACIONADOS</div>
              <ul className="divide-y divide-[#f5e6d6]">
                {related.map((ev) => (
                  <li 
                    key={ev.id} 
                    className="py-2 text-base text-gray-900 hover:text-[#e94d2c] cursor-pointer transition"
                    onClick={() => router.push(`/proximos-eventos?id=${ev.id}`)}
                  >
                    {ev.title}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // Show the events list if no ID is provided
  return (
    <div className="min-h-screen bg-[#fdf6ef] flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">Próximos Eventos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((evento) => (
            <div 
              key={evento.id} 
              className="block group cursor-pointer"
              onClick={() => router.push(`/proximos-eventos?id=${evento.id}`)}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full transition hover:shadow-2xl">
                <img
                  src={evento.image}
                  alt={evento.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-red-600 text-xs font-semibold">{evento.category}</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(evento.id);
                      }}
                      className={likedEvents.has(evento.id) ? "text-red-500" : "text-gray-400"}
                    >
                      <Heart className={`w-4 h-4 ${likedEvents.has(evento.id) ? "fill-red-500" : ""}`} />
                    </Button>
                  </div>
                  <h2 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-red-600 transition">{evento.title}</h2>
                  <div className="text-gray-700 text-sm mb-2 flex-1">
                    {evento.description.length > 120 ? evento.description.slice(0, 120) + '...' : evento.description}
                  </div>
                  <div className="text-xs text-gray-500 mt-auto space-y-1">
                    <div className="font-semibold text-[#e94d2c] flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {evento.date} às {evento.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {evento.location}
                    </div>
                    <div className="flex items-center">
                      <Wallet className="w-3 h-3 mr-1" />
                      {evento.price}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      {evento.registered}/{evento.capacity} inscritos
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProximosEventosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdf6ef] flex items-center justify-center">Carregando...</div>}>
      <ProximosEventosPageContent />
    </Suspense>
  );
} 