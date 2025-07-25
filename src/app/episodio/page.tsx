'use client';

import { YoutubeScreen } from "@/components/ui/youtube-screen";
import { useSearchParams } from "next/navigation";

export default function EpisodioPage() {
  const searchParams = useSearchParams();
  const videoId = searchParams.get('videoId');

  if (!videoId) {
    return <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>Nenhum vídeo selecionado.</div>;
  }

  return (
    <div style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100vw', maxWidth: '100vw' }}>
        <YoutubeScreen videoId={videoId} size={{ width: '100vw', height: '60vw' }} />
      </div>
    </div>
  );
} 