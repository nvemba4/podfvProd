'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MidiaListPage() {
  const [mainCards, setMainCards] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

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

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', padding: 24 }}>
      <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 32 }}>Mídia</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
        {mainCards.map((card) => (
          <Link key={card.id} href={`/midia?id=${card.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', overflow: 'hidden', transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
              <div style={{ width: '100%', height: 180, position: 'relative' }}>
                <Image src={card.image} alt={card.title} fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ fontWeight: 600, color: '#2563eb', marginBottom: 6 }}>{card.category}</div>
                <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{card.title}</div>
                <div style={{ color: '#444', fontSize: 15 }}>{card.description}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 