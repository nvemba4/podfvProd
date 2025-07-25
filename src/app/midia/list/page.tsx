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
    <div className="min-h-screen bg-[#fdf6ef] flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">Toda a Mídia</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainCards.map((card) => (
            <Link key={card.id} href={`/midia?id=${card.id}`} className="block group">
              <div className="bg-white shadow-lg overflow-hidden flex flex-col h-full transition hover:shadow-2xl">
                <div className="w-full h-48 relative">
                  <Image 
                    src={card.image} 
                    alt={card.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-red-600 text-xs font-semibold">{card.category}</span>
                  </div>
                  <h2 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-red-600 transition">{card.title}</h2>
                  <div className="text-gray-700 text-sm mb-2 flex-1">
                    {card.description.length > 120 ? card.description.slice(0, 120) + '...' : card.description}
                  </div>
                  <div className="text-xs text-gray-500 mt-auto">
                    <div className="font-semibold text-[#e94d2c]">{card.date}</div>
                    {card.tags && card.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {card.tags.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="bg-[#fdf1e2] text-[#a05a2c] px-2 py-1 rounded-full text-xs font-semibold">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 