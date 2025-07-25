'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaFacebook, FaTwitter } from 'react-icons/fa';

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

export default function MidiaInternalPage() {
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

  if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}>Carregando...</div>;

  const card = mainCards.find((item) => String(item.id) === String(id));
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const related = card?.related ? mainCards.filter((c) => card.related.includes(c.id)) : [];

  if (!card) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>Mídia não encontrada.</div>;
  }

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', padding: '0 0 40px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 40, alignItems: 'flex-start', padding: '40px 16px 0 16px' }}>
        {/* Main Content */}
        <main style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: 0, overflow: 'hidden' }}>
          {/* Imagem com overlay de data e tag */}
          <div style={{ width: '100%', height: 320, position: 'relative', marginBottom: 0 }}>
            <Image src={card.image} alt={card.title} fill style={{ objectFit: 'cover' }} />
            <div style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px 16px 24px', background: 'linear-gradient(0deg,rgba(0,0,0,0.45) 60%,transparent 100%)' }}>
              <span style={{ color: '#fff', fontWeight: 600, fontSize: 15, background: 'rgba(0,0,0,0.32)', borderRadius: 6, padding: '2px 12px', letterSpacing: 0.5 }}>{card.date}</span>
              {card.tags && card.tags.length > 0 && (
                <span style={{ color: '#fff', fontWeight: 600, fontSize: 15, background: '#f59e0b', borderRadius: 6, padding: '2px 12px', marginLeft: 8 }}>{card.tags[0]}</span>
              )}
            </div>
          </div>
          <div style={{ padding: '40px 48px 32px 48px' }}>
            <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: '#222', lineHeight: 1.2 }}>{card.title}</h1>
            <div style={{ fontSize: 19, color: '#444', marginBottom: 18 }}>{card.description}</div>
            {card.quote && (
              <div style={{ background: '#fef3c7', color: '#b45309', fontWeight: 600, fontSize: 18, borderRadius: 8, padding: '16px 18px', marginBottom: 28, textAlign: 'center', border: '1px solid #fde68a' }}>
                {card.quote}
              </div>
            )}
            <div style={{ fontSize: 17, color: '#222', lineHeight: 1.7, marginBottom: 32, whiteSpace: 'pre-line' }}>{card.content}</div>
            <form
              onSubmit={e => {
                e.preventDefault();
                if (commentInput.trim()) {
                  setComments([commentInput, ...comments]);
                  setCommentInput('');
                }
              }}
              style={{ display: 'flex', gap: 8, marginBottom: 16 }}
            >
              <input
                type="text"
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                placeholder="Escreva um comentário..."
                style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #e5e7eb', fontSize: 16, background: '#fafafa' }}
              />
              <button type="submit" style={{ padding: '10px 22px', borderRadius: 6, background: '#f97316', color: '#fff', border: 'none', fontWeight: 700, fontSize: 16, boxShadow: '0 2px 8px rgba(249,115,22,0.08)' }}>
                Comentar
              </button>
            </form>
            <div style={{ marginBottom: 24 }}>
              {comments.length === 0 && <div style={{ color: '#888' }}>Nenhum comentário ainda.</div>}
              {comments.map((c, i) => (
                <div key={i} style={{ background: '#f5f5f5', borderRadius: 4, padding: 10, marginBottom: 8 }}>{c}</div>
              ))}
            </div>
            <div style={{ marginBottom: 0, marginTop: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontWeight: 600, marginRight: 12, color: '#222' }}>Compartilhar:</span>
              {shareLinks(card.title, pageUrl).map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', marginRight: 8, textDecoration: 'none' }}
                  title={`Compartilhar no ${s.name}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </main>
        {/* Sidebar */}
        <aside style={{ width: 340, flexShrink: 0 }}>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', padding: 28, marginBottom: 32 }}>
            <div style={{ fontWeight: 700, color: '#b45309', fontSize: 15, marginBottom: 10 }}>TAGS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 18 }}>
              {card.tags && card.tags.map((tag: string) => (
                <span key={tag} style={{ background: '#f3f3f3', color: '#b45309', fontWeight: 600, fontSize: 13, borderRadius: 6, padding: '2px 10px' }}>#{tag}</span>
              ))}
            </div>
            <div style={{ fontWeight: 700, color: '#b45309', fontSize: 15, marginBottom: 10 }}>POSTAGENS RELACIONADAS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {related.map((rel) => (
                <Link key={rel.id} href={`/midia?id=${rel.id}`} style={{ textDecoration: 'none', color: '#222', fontWeight: 500, fontSize: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 54, height: 38, position: 'relative', borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                      <Image src={rel.image} alt={rel.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <span>{rel.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
} 