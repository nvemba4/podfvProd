'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';

const shareLinks = (title: string, url: string) => [
  {
    name: 'WhatsApp',
    url: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    icon: <FaWhatsapp color="#25D366" size={26} />,
  },
  {
    name: 'Facebook',
    url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    icon: <FaFacebook color="#1877F3" size={26} />,
  },
  {
    name: 'Twitter',
    url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    icon: <FaTwitter color="#1DA1F2" size={26} />,
  },
];

function MidiaInternalPageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [mainCards, setMainCards] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [comments, setComments] = useState<string[]>([]);
  const [commentInput, setCommentInput] = useState('');

  React.useEffect(() => {
    fetch('/api/midia/mainCards')
      .then((res) => res.json())
      .then((data) => {
        setMainCards(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen bg-[#fdf6ef] flex items-center justify-center">Carregando...</div>;

  const card = mainCards.find((item) => String(item.id) === String(id));
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const related = card?.related ? mainCards.filter((c) => card.related.includes(c.id)) : [];

  if (!card) {
    return <div className="min-h-screen bg-[#fdf6ef] flex items-center justify-center text-red-600">Mídia não encontrada.</div>;
  }

  return (
    <div className="min-h-screen bg-[#fdf6ef] flex justify-center py-8 px-2">
      <div className="w-full max-w-4xl bg-white/90 shadow-xl flex flex-col md:flex-row overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 p-8 md:pr-4">
          {/* Hero Image with overlay */}
          <div className="relative overflow-hidden mb-8">
            <Image
              src={card.image}
              alt={card.title}
              width={800}
              height={400}
              className="w-full h-56 md:h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#fdf6ef] via-transparent to-transparent px-6 py-4">
              <span className="text-[#e94d2c] font-semibold text-base">{card.category}</span>
              <div className="text-xs text-gray-700 mt-1">{card.date}</div>
            </div>
          </div>
          {/* Title & Content */}
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-gray-900 leading-tight">
            {card.title}
          </h1>
          <div className="text-lg font-serif text-gray-800 mb-6">
            {card.description}
          </div>
          {/* Quote */}
          {card.quote && (
            <div className="bg-[#fdf1e2] border border-[#f5d6b3] rounded-lg px-6 py-4 mb-6 text-center text-[#a05a2c] text-base font-serif shadow-sm">
              {card.quote}
            </div>
          )}
          {/* Content */}
          <div className="text-gray-800 text-base leading-relaxed mb-6 whitespace-pre-line">
            {card.content}
          </div>
          {/* Comments */}
          <div className="mb-6">
            <form
              onSubmit={e => {
                e.preventDefault();
                if (commentInput.trim()) {
                  setComments([commentInput, ...comments]);
                  setCommentInput('');
                }
              }}
              className="flex gap-4 mb-4"
            >
              <input
                type="text"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                placeholder="Escreva um comentário..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#e94d2c] focus:border-transparent"
              />
              <Button 
                type="submit" 
                variant="default"
                size="default"
                className="bg-[#e94d2c] hover:bg-[#d13d1c] text-white"
              >
                Comentar
              </Button>
            </form>
            <div>
              {comments.length === 0 && <div className="text-gray-500 text-sm">Nenhum comentário ainda.</div>}
              {comments.map((c, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4 mb-3 text-gray-800">{c}</div>
              ))}
            </div>
          </div>
          {/* Social Sharing */}
          <div className="flex gap-4 mb-6">
            <span className="font-semibold text-gray-900 mr-4">Compartilhar:</span>
            {shareLinks(card.title, pageUrl).map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                title={`Compartilhar no ${s.name}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
          {/* Back to list button */}
          <div className="mb-6">
            <Button 
              asChild
              variant="default"
              size="default"
              className="bg-[#e94d2c] hover:bg-[#d13d1c] text-white"
            >
              <Link href="/midia/list">
                ← Voltar à Mídia
              </Link>
            </Button>
          </div>
        </div>
        {/* Sidebar */}
        <aside className="w-full md:w-80 bg-[#fcf7f2] border-l border-[#f5e6d6] flex flex-col p-6 gap-8">
          {/* Tags */}
          <div>
            <div className="text-[#e09a4b] font-semibold text-sm mb-2 tracking-wide uppercase">TAGS</div>
            <div className="flex flex-wrap gap-2">
              {card.tags && card.tags.map((tag: string) => (
                <span key={tag} className="bg-[#fdf1e2] text-[#a05a2c] px-3 py-1 rounded-full text-xs font-semibold">#{tag}</span>
              ))}
            </div>
          </div>
          {/* Related Posts */}
          <div>
            <div className="text-[#e94d2c] font-semibold text-sm mb-2 tracking-wide uppercase">POSTAGENS RELACIONADAS</div>
            <ul className="divide-y divide-[#f5e6d6]">
              {related.map((rel) => (
                <li 
                  key={rel.id} 
                  className="py-2 text-base text-gray-900 hover:text-[#e94d2c] cursor-pointer transition"
                >
                  <Link href={`/midia?id=${rel.id}`} className="flex items-center gap-3">
                    <div className="w-12 h-8 relative overflow-hidden rounded">
                      <Image src={rel.image} alt={rel.title} fill className="object-cover" />
                    </div>
                    <span className="flex-1">{rel.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function MidiaInternalPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdf6ef] flex items-center justify-center">Carregando...</div>}>
      <MidiaInternalPageContent />
    </Suspense>
  );
} 