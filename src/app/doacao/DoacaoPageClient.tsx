'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, CreditCard, Building2, Smartphone, CheckCircle, ArrowLeft, Users, Home, Utensils, Baby, User, MapPin, X, ChevronLeft, ChevronRight, Camera, Calendar, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Social causes data
const socialCauses = [
  {
    id: 1,
    title: "Ajude Dona Maria com alimentos para seus 3 filhos",
    description: "Dona Maria vive em um bairro periférico com seus três filhos. Ela perdeu o emprego recentemente e está sem recursos para garantir alimentação básica.",
    needs: ["Cesta básica", "Apoio financeiro para aluguel", "Roupas infantis"],
    image: "/images/student.jpeg",
    location: "Luanda, Angola",
    familyMembers: 4,
    urgency: "Alta",
    progress: 0,
    target: 50000,
    story: "Dona Maria é uma mãe solteira que trabalhou por 15 anos como empregada doméstica. Com a pandemia, perdeu seu emprego e agora luta para alimentar seus três filhos com idades entre 5 e 12 anos. Ela mora em uma casa de um quarto e precisa de ajuda urgente para manter a família unida e alimentada.",
    photos: ["/images/student.jpeg", "/images/prayers.jpg", "/images/conf-1.jpg"],
    detailedStory: "Dona Maria, 38 anos, sempre foi uma trabalhadora incansável. Durante 15 anos, ela trabalhou como empregada doméstica em várias casas, garantindo que seus filhos tivessem o básico para viver. Com a chegada da pandemia, ela perdeu todos os seus empregos e agora vive com apenas 15.000 Kz por mês de ajuda social.\n\nSeus filhos - João (12 anos), Ana (8 anos) e Pedro (5 anos) - são muito dedicados aos estudos, mas a falta de alimentação adequada está afetando seu desempenho escolar. A família mora em uma casa de um quarto no bairro de Sambizanga, onde o aluguel é de 25.000 Kz por mês.\n\nDona Maria precisa urgentemente de:\n• Cesta básica mensal (30.000 Kz)\n• Apoio para o aluguel (10.000 Kz)\n• Roupas e calçados para as crianças\n• Material escolar\n\nSua doação pode transformar a vida desta família e dar esperança para um futuro melhor.",
    contactInfo: {
      phone: "+244 923 456 789",
      email: "maria.familia@email.com",
      address: "Rua da Esperança, nº 45, Sambizanga, Luanda"
    }
  },
  {
    id: 2,
    title: "Apoie João na cirurgia de emergência",
    description: "João, 8 anos, precisa de uma cirurgia urgente no coração. A família não tem recursos para o tratamento médico.",
    needs: ["Cirurgia cardíaca", "Medicamentos", "Acompanhamento médico"],
    image: "/images/conf-3.jpg",
    location: "Benguela, Angola",
    familyMembers: 3,
    urgency: "Crítica",
    progress: 150000,
    target: 300000,
    story: "João é um menino de 8 anos que descobriu um problema cardíaco grave. Os médicos disseram que precisa de cirurgia urgente, mas a família não tem condições financeiras. O pai trabalha como pedreiro e a mãe como vendedora ambulante. Eles já venderam tudo que tinham para pagar os exames iniciais.",
    photos: ["/images/conf-3.jpg", "/images/prayers.jpg", "/images/conf-1.jpg"],
    detailedStory: "João Pedro Santos, 8 anos, é um menino muito inteligente e carinhoso que adora futebol e matemática. Em janeiro deste ano, durante uma consulta de rotina, os médicos descobriram que ele tem uma cardiopatia congênita que precisa de correção cirúrgica urgente.\n\nSeus pais, José (35 anos) e Maria (32 anos), são trabalhadores humildes. José trabalha como pedreiro e Maria como vendedora ambulante. Juntos, ganham cerca de 45.000 Kz por mês, o que mal dá para as despesas básicas da família.\n\nPara pagar os exames iniciais, a família já vendeu todos os bens que tinham, incluindo a televisão e alguns móveis. A cirurgia custa 300.000 Kz e inclui:\n• Cirurgia cardíaca\n• 5 dias de internação\n• Medicamentos pós-operatórios\n• Acompanhamento médico por 6 meses\n\nO tempo é crucial - quanto mais rápido a cirurgia for realizada, melhor será a recuperação de João. Sua doação pode salvar a vida deste menino e dar esperança para toda a família.",
    contactInfo: {
      phone: "+244 924 123 456",
      email: "joao.cirurgia@email.com",
      address: "Rua da Saúde, nº 78, Benguela"
    }
  },
  {
    id: 3,
    title: "Ajude a família Silva com moradia",
    description: "A família Silva perdeu sua casa em um incêndio e precisa de ajuda para reconstruir suas vidas.",
    needs: ["Material de construção", "Móveis básicos", "Roupas e calçados"],
    image: "/images/workshopmulheres.png",
    location: "Huambo, Angola",
    familyMembers: 6,
    urgency: "Alta",
    progress: 75000,
    target: 200000,
    story: "A família Silva perdeu tudo em um incêndio que destruiu sua casa. Eles são uma família de 6 pessoas, incluindo 4 crianças. O pai é agricultor e a mãe trabalha como costureira. Eles precisam de ajuda para reconstruir suas vidas e dar um teto digno para seus filhos.",
    photos: ["/images/workshopmulheres.png", "/images/conf-1.jpg", "/images/prayers.jpg"],
    detailedStory: "A família Silva - composta por Manuel (42 anos), Rosa (38 anos) e seus 4 filhos - perdeu tudo na madrugada de 15 de março, quando um incêndio destruiu completamente sua casa. O fogo começou em uma casa vizinha e se espalhou rapidamente, consumindo tudo que tinham.\n\nManuel trabalha como agricultor e Rosa como costureira. Juntos, ganham cerca de 35.000 Kz por mês. Eles moravam em uma casa de 3 quartos que construíram com muito esforço ao longo de 10 anos.\n\nAtualmente, a família está morando temporariamente na casa de parentes, mas o espaço é pequeno e não há condições adequadas para as crianças estudarem. Os filhos - Carlos (15 anos), Sofia (12 anos), Miguel (9 anos) e Luísa (6 anos) - estão tendo dificuldades na escola por falta de um ambiente adequado para estudar.\n\nPara reconstruir a casa, precisam de:\n• Material de construção (120.000 Kz)\n• Móveis básicos (50.000 Kz)\n• Roupas e calçados para todos (30.000 Kz)\n\nSua doação pode ajudar esta família a reconstruir suas vidas e dar um lar digno para as crianças.",
    contactInfo: {
      phone: "+244 925 789 123",
      email: "familia.silva@email.com",
      address: "Bairro da Esperança, Huambo"
    }
  },
  {
    id: 4,
    title: "Apoie Ana na educação dos filhos",
    description: "Ana é viúva e luta para manter seus filhos na escola. Precisa de ajuda com material escolar e uniformes.",
    needs: ["Material escolar", "Uniformes", "Apoio financeiro mensal"],
    image: "/images/student.jpeg",
    location: "Lobito, Angola",
    familyMembers: 3,
    urgency: "Média",
    progress: 25000,
    target: 80000,
    story: "Ana ficou viúva há 2 anos e agora luta sozinha para criar seus dois filhos. Ela trabalha como empregada doméstica, mas o salário não é suficiente para manter os filhos na escola. Os filhos são muito dedicados aos estudos e ela não quer que eles abandonem a escola.",
    photos: ["/images/student.jpeg", "/images/conf-3.jpg", "/images/prayers.jpg"],
    detailedStory: "Ana Costa, 36 anos, ficou viúva há 2 anos quando seu marido faleceu vítima de um acidente de trabalho. Desde então, ela luta sozinha para criar seus dois filhos - Tiago (14 anos) e Beatriz (11 anos).\n\nAna trabalha como empregada doméstica em 3 casas diferentes, ganhando cerca de 25.000 Kz por mês. Com este valor, ela consegue pagar apenas o aluguel (15.000 Kz) e alimentação básica. Não sobra dinheiro para material escolar, uniformes e outras despesas da escola.\n\nTiago está no 9º ano e é um excelente aluno, especialmente em matemática. Beatriz está no 6º ano e adora ler e escrever. Ambos sonham em ir para a universidade, mas Ana teme que tenham que abandonar os estudos por falta de recursos.\n\nAna precisa de ajuda para:\n• Material escolar para o ano letivo (30.000 Kz)\n• Uniformes escolares (20.000 Kz)\n• Apoio financeiro mensal para despesas escolares (15.000 Kz)\n• Livros e material de estudo (15.000 Kz)\n\nSua doação pode garantir que estas crianças continuem estudando e realizem seus sonhos.",
    contactInfo: {
      phone: "+244 926 456 789",
      email: "ana.educacao@email.com",
      address: "Rua da Escola, nº 23, Lobito"
    }
  },
  {
    id: 5,
    title: "Ajude Pedro com tratamento de diabetes",
    description: "Pedro, 65 anos, precisa de tratamento contínuo para diabetes. A família não consegue pagar os medicamentos.",
    needs: ["Medicamentos para diabetes", "Consultas médicas", "Alimentação especial"],
    image: "/images/ProfetaCastelo.png",
    location: "Luanda, Angola",
    familyMembers: 2,
    urgency: "Alta",
    progress: 30000,
    target: 120000,
    story: "Pedro é um senhor de 65 anos que descobriu diabetes há 3 anos. Ele mora com sua filha que é professora, mas o salário não é suficiente para pagar os medicamentos e consultas médicas. Pedro precisa de tratamento contínuo para controlar a doença.",
    photos: ["/images/ProfetaCastelo.png", "/images/conf-1.jpg", "/images/prayers.jpg"],
    detailedStory: "Pedro Mendes, 65 anos, é um aposentado que trabalhou por 35 anos como professor. Há 3 anos, durante um exame de rotina, descobriu que tem diabetes tipo 2. Desde então, precisa de tratamento contínuo para controlar a doença.\n\nPedro mora com sua filha única, Carla (32 anos), que é professora e ganha cerca de 40.000 Kz por mês. Com este salário, ela consegue pagar o aluguel (20.000 Kz) e alimentação básica, mas não sobra dinheiro suficiente para os medicamentos e consultas médicas do pai.\n\nO tratamento de Pedro inclui:\n• Medicamentos para diabetes (15.000 Kz/mês)\n• Consultas médicas mensais (8.000 Kz/mês)\n• Exames de controle (5.000 Kz/mês)\n• Alimentação especial (10.000 Kz/mês)\n\nSem o tratamento adequado, Pedro corre risco de complicações graves como cegueira, problemas renais e amputações. Sua doação pode garantir que Pedro tenha acesso ao tratamento que precisa para viver com qualidade de vida.",
    contactInfo: {
      phone: "+244 927 123 456",
      email: "pedro.diabetes@email.com",
      address: "Rua da Saúde, nº 67, Luanda"
    }
  },
  {
    id: 6,
    title: "Apoie a família Santos com alimentação",
    description: "A família Santos tem 5 filhos e está passando por dificuldades financeiras. Precisa de ajuda com alimentação básica.",
    needs: ["Cesta básica mensal", "Roupas para crianças", "Apoio financeiro"],
    image: "/images/piquenique.jpeg",
    location: "Namibe, Angola",
    familyMembers: 7,
    urgency: "Alta",
    progress: 40000,
    target: 100000,
    story: "A família Santos tem 5 filhos com idades entre 2 e 15 anos. O pai trabalha como pescador e a mãe como vendedora. Com a crise econômica, eles estão passando por dificuldades para alimentar a família. Os filhos são muito unidos e ajudam os pais quando podem.",
    photos: ["/images/piquenique.jpeg", "/images/student.jpeg", "/images/conf-3.jpg"],
    detailedStory: "A família Santos - composta por José (40 anos), Maria (38 anos) e seus 5 filhos - vive em Namibe, onde José trabalha como pescador e Maria como vendedora ambulante. Com a crise econômica e a diminuição da pesca, a família está passando por dificuldades financeiras.\n\nOs filhos - Rafael (15 anos), Isabel (12 anos), Lucas (9 anos), Gabriela (6 anos) e Miguel (2 anos) - são muito unidos e ajudam os pais quando podem. Rafael ajuda o pai na pesca aos fins de semana, e Isabel cuida dos irmãos menores enquanto os pais trabalham.\n\nA família mora em uma casa de 2 quartos e, com o aumento dos preços dos alimentos, está tendo dificuldades para garantir refeições adequadas para todos. As crianças estão perdendo peso e tendo dificuldades de concentração na escola.\n\nA família precisa de:\n• Cesta básica mensal (40.000 Kz)\n• Roupas e calçados para as crianças (30.000 Kz)\n• Apoio financeiro para despesas básicas (30.000 Kz)\n\nSua doação pode garantir que esta família tenha alimentação adequada e que as crianças possam crescer saudáveis.",
    contactInfo: {
      phone: "+244 928 789 123",
      email: "familia.santos@email.com",
      address: "Bairro dos Pescadores, Namibe"
    }
  }
];

// Payment methods
const paymentMethods = [
  {
    id: 'iban',
    name: 'Transferência IBAN',
    icon: Building2,
    description: 'Transferência bancária direta',
    details: {
      title: 'Transferência Bancária IBAN',
      instructions: [
        '1. Acesse o seu banco online ou aplicativo móvel',
        '2. Selecione "Transferência" ou "Pagamento"',
        '3. Insira os dados bancários fornecidos',
        '4. Confirme a transferência',
        '5. Guarde o comprovante'
      ],
      bankInfo: {
        bankName: 'Banco de Fomento Angola (BFA)',
        accountName: 'Podfé - Projetos Sociais',
        iban: 'AO06 0006 0000 1234 5678 9012 3',
        swift: 'BFAOAOLU',
        accountNumber: '1234567890123'
      },
      note: 'A transferência pode levar 1-2 dias úteis para ser processada.'
    }
  },
  {
    id: 'qr',
    name: 'QR Code Multicaixa',
    icon: Smartphone,
    description: 'Pagamento via QR Code',
    details: {
      title: 'Pagamento via QR Code Multicaixa',
      instructions: [
        '1. Abra o aplicativo do seu banco',
        '2. Selecione "Pagamentos" ou "Multicaixa"',
        '3. Escolha "Pagar com QR Code"',
        '4. Aponte a câmera para o código QR',
        '5. Confirme o valor e dados',
        '6. Digite o seu PIN',
        '7. Guarde o comprovante'
      ],
      qrInfo: {
        provider: 'Multicaixa Express',
        validUntil: '24 horas',
        maxAmount: '500.000 Kz por transação'
      },
      note: 'O QR Code será gerado após confirmar a doação.'
    }
  },
  {
    id: 'card',
    name: 'Cartão de Crédito/Débito',
    icon: CreditCard,
    description: 'Visa, Mastercard, Stripe',
    details: {
      title: 'Pagamento com Cartão',
      instructions: [
        '1. Preencha os dados do cartão',
        '2. Verifique o valor da doação',
        '3. Digite o código de segurança (CVV)',
        '4. Confirme o pagamento',
        '5. Aguarde a confirmação'
      ],
      cardInfo: {
        acceptedCards: ['Visa', 'Mastercard', 'American Express'],
        security: 'Pagamento seguro via Stripe',
        processingTime: 'Imediato',
        currency: 'Kwanza (Kz)'
      },
      note: 'Seu cartão será processado de forma segura pela Stripe.'
    }
  }
];

export default function DoacaoPageClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedCause, setSelectedCause] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [donationOpen, setDonationOpen] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showPaymentDetails, setShowPaymentDetails] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    message: '',
    anonymous: false
  });

  // Carousel slides data
  const carouselSlides = [
    {
      id: 1,
      title: "Apoie uma Família. Transforme uma Vida.",
      content: [
        "Este projeto é focado em ajudar diretamente pessoas e famílias que estão a passar por dificuldades reais.",
        "Alimentação, vestuário, abrigo, saúde — cada necessidade conta.",
        "A sua doação faz a diferença na vida de quem mais precisa."
      ]
    },
    {
      id: 2,
      title: "Solidariedade que Transforma",
      content: [
        "Cada doação é um gesto de amor e esperança.",
        "Juntos podemos construir um futuro melhor para todos.",
        "A sua generosidade muda vidas reais."
      ]
    },
    {
      id: 3,
      title: "Faça a Diferença Hoje",
      content: [
        "Não é preciso muito para fazer muito.",
        "Cada contribuição, por menor que seja, conta.",
        "Seja parte da mudança que queremos ver no mundo."
      ]
    },
    {
      id: 4,
      title: "Esperança para o Amanhã",
      content: [
        "A esperança é o que nos move a ajudar.",
        "Cada família ajudada é uma vitória para todos.",
        "Vamos juntos construir um mundo mais solidário."
      ]
    }
  ];

  // Fix hydration by ensuring component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDonation = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate success
    setDonationSuccess(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setDonationSuccess(false);
      setDonationOpen(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        amount: '',
        message: '',
        anonymous: false
      });
      setCurrentPhotoIndex(0);
    }, 3000);
  };

  const selectedCauseData = socialCauses.find(c => c.id === selectedCause);

  const getProgressPercentage = (progress: number, target: number) => {
    return Math.min((progress / target) * 100, 100);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Crítica': return 'bg-red-500';
      case 'Alta': return 'bg-orange-500';
      case 'Média': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  const nextPhoto = () => {
    if (selectedCauseData) {
      setCurrentPhotoIndex((prev) => 
        prev === selectedCauseData.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevPhoto = () => {
    if (selectedCauseData) {
      setCurrentPhotoIndex((prev) => 
        prev === 0 ? selectedCauseData.photos.length - 1 : prev - 1
      );
    }
  };

  const handleOpenDonation = (causeId: number) => {
    setSelectedCause(causeId);
    setDonationOpen(true);
    setCurrentPhotoIndex(0);
  };

  const togglePaymentDetails = (methodId: string) => {
    setShowPaymentDetails(showPaymentDetails === methodId ? null : methodId);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play carousel
  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [mounted, currentSlide]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-[#fdf6ef] flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-[#fdf6ef] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Text Carousel */}
        <div className="mb-8 relative">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            {/* Carousel Container */}
            <div className="relative">
              {/* Slides */}
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {carouselSlides.map((slide, index) => (
                  <div key={slide.id} className="w-full flex-shrink-0 p-6">
                    <div className="text-center max-w-4xl mx-auto">
                      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                        {slide.title}
                      </h1>
                      
                      <div className="space-y-2 text-sm md:text-base text-gray-700 leading-relaxed">
                        {slide.content.map((paragraph, pIndex) => (
                          <p key={pIndex}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600 hover:text-gray-900 p-2 rounded-full shadow-md transition-all duration-200"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-600 hover:text-gray-900 p-2 rounded-full shadow-md transition-all duration-200"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 p-4">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentSlide === index 
                      ? 'bg-[#e94d2c] scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <button 
            onClick={() => router.push('/')}
            className="flex items-center text-[#e94d2c] hover:text-[#d13d1c] mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Início
          </button>
          <div className="flex items-center gap-2 mb-4">
            <span className="block w-6 h-0.5 bg-red-500"></span>
            <span className="text-red-500 font-semibold text-sm">SOLIDARIEDADE</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Causas Sociais que Precisam do Seu Apoio</h2>
          <p className="text-lg text-gray-700 max-w-3xl">
            Conheça as histórias reais e faça a diferença na vida de quem mais precisa.
          </p>
        </div>

        {/* Social Causes Grid */}
        <div className="mb-12">
         
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialCauses.map((cause) => (
              <div
                key={cause.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                onClick={() => handleOpenDonation(cause.id)}
              >
                <div className="relative">
                  <img
                    src={cause.image}
                    alt={cause.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getUrgencyColor(cause.urgency)}`}>
                      {cause.urgency}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {cause.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {cause.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {cause.location}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {cause.familyMembers} pessoas
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progresso</span>
                      <span className="text-gray-900 font-semibold">
                        {cause.progress.toLocaleString()} / {cause.target.toLocaleString()} Kz
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#e94d2c] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage(cause.progress, cause.target)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Needs Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cause.needs.slice(0, 2).map((need, index) => (
                      <span key={index} className="bg-[#fdf1e2] text-[#a05a2c] px-2 py-1 rounded-full text-xs">
                        {need}
                      </span>
                    ))}
                    {cause.needs.length > 2 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                        +{cause.needs.length - 2} mais
                      </span>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full bg-[#e94d2c] hover:bg-[#d13d1c] text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDonation(cause.id);
                    }}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    DOAR AGORA
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Donation Modal */}
        {selectedCauseData && (
          <Dialog open={donationOpen} onOpenChange={setDonationOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader className="pb-4">
                <DialogTitle className="text-xl">{selectedCauseData.title}</DialogTitle>
                <DialogDescription>
                  Conheça a história completa e faça sua doação para transformar esta vida.
                </DialogDescription>
              </DialogHeader>
              
              {!donationSuccess ? (
                <div className="space-y-6">
                  {/* Photo Gallery */}
                  <div className="relative">
                    <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                      <img
                        src={selectedCauseData.photos[currentPhotoIndex]}
                        alt={`Foto ${currentPhotoIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Navigation Arrows */}
                      <button
                        onClick={prevPhoto}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={nextPhoto}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      
                      {/* Photo Counter */}
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                        {currentPhotoIndex + 1} / {selectedCauseData.photos.length}
                      </div>
                    </div>
                    
                    {/* Photo Thumbnails */}
                    <div className="flex gap-2 mt-3 justify-center">
                      {selectedCauseData.photos.map((photo, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPhotoIndex(index)}
                          className={`w-12 h-12 rounded overflow-hidden ${
                            currentPhotoIndex === index ? 'ring-2 ring-[#e94d2c]' : ''
                          }`}
                        >
                          <img
                            src={photo}
                            alt={`Miniatura ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Story and Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Story */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <User className="w-5 h-5 mr-2 text-[#e94d2c]" />
                          História Completa
                        </h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-700 whitespace-pre-line">
                            {selectedCauseData.detailedStory}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Target className="w-5 h-5 mr-2 text-[#e94d2c]" />
                          Necessidades Específicas
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedCauseData.needs.map((need, index) => (
                            <span key={index} className="bg-[#fdf1e2] text-[#a05a2c] px-3 py-2 rounded-full text-sm">
                              {need}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Progress and Contact */}
                    <div className="space-y-4">
                      {/* Progress Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-[#e94d2c]" />
                          Progresso da Campanha
                        </h3>
                        <div className="bg-white border rounded-lg p-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">Arrecadado</span>
                            <span className="text-gray-900 font-semibold">
                              {selectedCauseData.progress.toLocaleString()} Kz
                            </span>
                          </div>
                          <div className="flex justify-between text-sm mb-3">
                            <span className="text-gray-600">Meta</span>
                            <span className="text-gray-900 font-semibold">
                              {selectedCauseData.target.toLocaleString()} Kz
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                            <div 
                              className="bg-[#e94d2c] h-3 rounded-full transition-all duration-300"
                              style={{ width: `${getProgressPercentage(selectedCauseData.progress, selectedCauseData.target)}%` }}
                            ></div>
                          </div>
                          <div className="text-center text-sm text-gray-600">
                            {getProgressPercentage(selectedCauseData.progress, selectedCauseData.target).toFixed(1)}% da meta alcançada
                          </div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <MapPin className="w-5 h-5 mr-2 text-[#e94d2c]" />
                          Informações de Contato
                        </h3>
                        <div className="bg-white border rounded-lg p-4 space-y-2 text-sm">
                          <div className="flex items-center">
                            <span className="font-semibold w-20">Telefone:</span>
                            <span className="text-gray-700">{selectedCauseData.contactInfo.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="font-semibold w-20">Email:</span>
                            <span className="text-gray-700">{selectedCauseData.contactInfo.email}</span>
                          </div>
                          <div className="flex items-start">
                            <span className="font-semibold w-20">Endereço:</span>
                            <span className="text-gray-700">{selectedCauseData.contactInfo.address}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Donation Form */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Faça Sua Doação</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
                        <Label htmlFor="amount" className="text-sm">Valor da Doação (Kz) *</Label>
                        <Input
                          id="amount"
                          type="number"
                          value={formData.amount}
                          onChange={(e) => handleInputChange('amount', e.target.value)}
                          placeholder="Qualquer valor"
                          min="100"
                          required
                          className="h-9"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Label htmlFor="message" className="text-sm">Mensagem para a família (Opcional)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Deixe uma mensagem de apoio e carinho..."
                        rows={3}
                        className="resize-none"
                      />
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={formData.anonymous}
                        onChange={(e) => handleInputChange('anonymous', e.target.checked)}
                        className="mr-2"
                      />
                      <Label htmlFor="anonymous" className="text-sm">Doação anônima</Label>
                    </div>
                    
                    <div className="mt-6">
                      <Label className="text-sm mb-3 block">Método de Pagamento *</Label>
                      <div className="space-y-3">
                        {paymentMethods.map((method) => (
                          <div key={method.id}>
                            <div
                              className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                                selectedPayment === method.id 
                                  ? 'border-[#e94d2c] bg-[#fdf1e2]' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => setSelectedPayment(method.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <method.icon className="w-5 h-5 mr-3 text-gray-600" />
                                  <div>
                                    <div className="font-semibold text-sm">{method.name}</div>
                                    <div className="text-xs text-gray-600">{method.description}</div>
                                  </div>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    togglePaymentDetails(method.id);
                                  }}
                                  className="text-[#e94d2c] hover:text-[#d13d1c] text-sm font-medium"
                                >
                                  {showPaymentDetails === method.id ? 'Ocultar detalhes' : 'Ver detalhes'}
                                </button>
                              </div>
                            </div>
                            
                            {/* Payment Details */}
                            {showPaymentDetails === method.id && (
                              <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
                                <h4 className="font-semibold text-gray-900 mb-3">{method.details.title}</h4>
                                
                                {/* Instructions */}
                                <div className="mb-4">
                                  <h5 className="text-sm font-semibold text-gray-700 mb-2">Instruções:</h5>
                                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                                    {method.details.instructions.map((instruction, index) => (
                                      <li key={index}>{instruction}</li>
                                    ))}
                                  </ol>
                                </div>
                                
                                {/* Method-specific information */}
                                {method.id === 'iban' && method.details.bankInfo && (
                                  <div className="mb-4">
                                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Dados Bancários:</h5>
                                    <div className="bg-white p-3 rounded border text-sm">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <div><span className="font-semibold">Banco:</span> {method.details.bankInfo.bankName}</div>
                                        <div><span className="font-semibold">Titular:</span> {method.details.bankInfo.accountName}</div>
                                        <div><span className="font-semibold">IBAN:</span> {method.details.bankInfo.iban}</div>
                                        <div><span className="font-semibold">SWIFT:</span> {method.details.bankInfo.swift}</div>
                                        <div><span className="font-semibold">Conta:</span> {method.details.bankInfo.accountNumber}</div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {method.id === 'qr' && method.details.qrInfo && (
                                  <div className="mb-4">
                                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Informações QR Code:</h5>
                                    <div className="bg-white p-3 rounded border text-sm">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <div><span className="font-semibold">Provedor:</span> {method.details.qrInfo.provider}</div>
                                        <div><span className="font-semibold">Válido até:</span> {method.details.qrInfo.validUntil}</div>
                                        <div><span className="font-semibold">Valor máximo:</span> {method.details.qrInfo.maxAmount}</div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {method.id === 'card' && method.details.cardInfo && (
                                  <div className="mb-4">
                                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Informações do Cartão:</h5>
                                    <div className="bg-white p-3 rounded border text-sm">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <div><span className="font-semibold">Cartões aceites:</span> {method.details.cardInfo.acceptedCards.join(', ')}</div>
                                        <div><span className="font-semibold">Segurança:</span> {method.details.cardInfo.security}</div>
                                        <div><span className="font-semibold">Processamento:</span> {method.details.cardInfo.processingTime}</div>
                                        <div><span className="font-semibold">Moeda:</span> {method.details.cardInfo.currency}</div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                                
                                {/* Note */}
                                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                                  <p className="text-sm text-blue-800">
                                    <span className="font-semibold">Nota:</span> {method.details.note}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-600 mb-2">Doação Confirmada!</h3>
                  <p className="text-gray-600 mb-4">
                    Sua doação foi processada com sucesso. Você receberá um email de confirmação em breve.
                  </p>
                  <p className="text-sm text-gray-500">
                    Obrigado por fazer a diferença na vida de {selectedCauseData.familyMembers} pessoas!
                  </p>
                </div>
              )}
              
              <DialogFooter className="pt-6">
                {!donationSuccess ? (
                  <>
                    <DialogClose asChild>
                      <Button variant="outline" size="sm">Cancelar</Button>
                    </DialogClose>
                    <Button 
                      onClick={handleDonation}
                      disabled={isSubmitting || !formData.name || !formData.email || !formData.amount || !selectedPayment}
                      className="bg-[#e94d2c] hover:bg-[#d13d1c]"
                      size="sm"
                    >
                      {isSubmitting ? 'Processando...' : 'Confirmar Doação'}
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
        )}

        {/* Impact Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">O Impacto da Sua Solidariedade</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#e94d2c] mb-2">25+</div>
              <div className="text-gray-600">Famílias ajudadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#e94d2c] mb-2">150+</div>
              <div className="text-gray-600">Pessoas impactadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#e94d2c] mb-2">6</div>
              <div className="text-gray-600">Causas ativas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#e94d2c] mb-2">100%</div>
              <div className="text-gray-600">Transparência</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 