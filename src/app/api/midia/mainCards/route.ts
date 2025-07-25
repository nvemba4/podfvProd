import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: 0,
      image: "/images/ProfetaCastelo.png",
      category: "Podcast",
      title: "Profeta Castelo & Edna Quícola",
      description: "Um episódio especial com Profeta Castelo e Edna Quícola, discutindo fé, desafios e superação na cidade grande. Descubra insights inspiradores e histórias de vida marcantes.",
      date: "2025-07-10",
      tags: ["fé", "podcast", "superação"],
      quote: "Porque Deus tanto amou o mundo que deu o seu Filho unigênito.",
      related: [1, 2, 3],
      content: `Neste episódio, Profeta Castelo e Edna Quícola compartilham experiências de fé, desafios enfrentados ao mudar para a cidade grande e como a espiritualidade pode transformar vidas. O bate-papo aborda temas como resiliência, propósito e a importância da comunidade na jornada cristã.\n\nAlém disso, o episódio traz relatos inspiradores de superação, dicas práticas para fortalecer a fé no dia a dia e momentos de reflexão sobre o papel da esperança em tempos difíceis. Não perca este conteúdo especial, repleto de ensinamentos e motivação para sua caminhada espiritual.`
    },
    {
      id: 1,
      image: "/images/Meseparei.png",
      category: "Solidariedade",
      title: "Me Separei: Superando Desafios",
      description: "Relato emocionante sobre separação, recomeço e o poder da solidariedade. Uma conversa franca sobre reconstrução de vida e esperança.",
      date: "2025-07-12",
      tags: ["solidariedade", "recomeço"],
      quote: "Há esperança para quem recomeça com fé.",
      related: [0, 2, 4],
      content: `Neste episódio, ouvimos histórias de pessoas que passaram por separações dolorosas, mas encontraram força na fé e no apoio da comunidade. O programa destaca a importância de não desistir, buscar ajuda e acreditar em novos começos.\n\nDicas práticas, depoimentos e mensagens de esperança para quem está enfrentando momentos de transição.`
    },
    {
      id: 2,
      image: "/images/TudosobreCasamento.png",
      category: "Podcast",
      title: "Tudo Sobre Casamento!",
      description: "Especialistas e convidados debatem os segredos, alegrias e desafios do casamento moderno. Dicas práticas e testemunhos reais.",
      date: "2025-07-15",
      tags: ["casamento", "relacionamento"],
      quote: "O amor tudo sofre, tudo crê, tudo espera, tudo suporta.",
      related: [0, 1, 3],
      content: `Um episódio dedicado a casais e solteiros que desejam entender melhor o universo do casamento. Conversas sinceras sobre desafios, alegrias e o papel da fé nos relacionamentos.\n\nInclui perguntas de ouvintes, conselhos de especialistas e testemunhos de casais.`
    },
    {
      id: 3,
      image: "/images/FaithinMotion.png",
      category: "Fé",
      title: "Faith in Motion",
      description: "Um devocional em vídeo para fortalecer sua fé e motivar sua jornada espiritual. Reflexões, música e inspiração para o seu dia.",
      date: "2025-07-18",
      tags: ["fé", "devocional"],
      quote: "A fé é o firme fundamento das coisas que se esperam.",
      related: [0, 2, 4],
      content: `Neste devocional especial, você encontrará palavras de encorajamento, músicas inspiradoras e reflexões bíblicas para começar o dia com esperança.\n\nIdeal para quem busca renovar a fé e encontrar motivação para os desafios diários.`
    },
    {
      id: 4,
      image: "/images/Africanamericansoncast.png",
      category: "Evento",
      title: "African American Soncast",
      description: "Evento especial celebrando a cultura, música e fé da comunidade afro-americana. Participações especiais e muita inspiração.",
      date: "2025-07-20",
      tags: ["evento", "cultura", "música"],
      quote: "Celebre a diversidade e a fé que nos une.",
      related: [0, 3, 5],
      content: `Uma celebração vibrante com apresentações musicais, depoimentos e momentos de louvor. O evento destaca a importância da representatividade e da fé na construção de comunidades mais fortes e unidas.`
    },
    {
      id: 5,
      image: "/images/AlgenuraFinda.png",
      category: "Evento",
      title: "Algenura Finda: Jornada de Fé",
      description: "Conheça a trajetória de Algenura Finda, palestrante e líder, em um evento que une fé, liderança e transformação social.",
      date: "2025-07-22",
      tags: ["evento", "liderança"],
      quote: "Liderar é servir com amor e fé.",
      related: [1, 4, 6],
      content: `Algenura Finda compartilha sua história de superação, liderança e fé. O evento traz palestras, painéis e momentos de interação com o público, inspirando todos a buscarem seus sonhos com coragem.`
    },
    {
      id: 6,
      image: "/images/Africanamericansoncast.png",
      category: "Evento",
      title: "African American Soncast - Parte 2",
      description: "Continuação do evento com novos convidados, música e histórias de superação. Uma celebração da fé e da cultura.",
      date: "2025-07-25",
      tags: ["evento", "cultura"],
      quote: "Nossa cultura, nossa fé, nossa força.",
      related: [4, 5, 7],
      content: `A segunda parte do evento traz novas apresentações, testemunhos e momentos de louvor. Uma oportunidade para fortalecer laços e celebrar conquistas.`
    },
    {
      id: 7,
      image: "/images/AlgenuraFinda.png",
      category: "Evento",
      title: "Algenura Finda: Liderança e Fé",
      description: "Algenura Finda compartilha experiências sobre liderança cristã, desafios e conquistas em sua missão de inspirar pessoas.",
      date: "2025-07-28",
      tags: ["evento", "liderança", "fé"],
      quote: "A fé move montanhas e inspira líderes.",
      related: [1, 5, 6],
      content: `Neste evento, Algenura Finda fala sobre os desafios da liderança cristã, a importância da fé e como inspirar pessoas a seguirem seus propósitos. Inclui perguntas do público e momentos de oração.`
    },
  ]);
} 