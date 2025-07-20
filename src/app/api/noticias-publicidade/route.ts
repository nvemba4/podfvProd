import { NextResponse } from 'next/server';
import { mainNews, destaques, recentNews, ads } from '@/mock/noticiasPublicidadeData';

export async function GET() {
  try {
    return NextResponse.json({
      mainNews,
      destaques,
      recentNews,
      ads,
    });
  } catch (error) {
    console.error('Error in noticias-publicidade API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 