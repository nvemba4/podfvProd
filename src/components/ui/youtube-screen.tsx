import React from 'react';

interface YoutubeScreenProps {
  videoId: string;
  size?: 'small' | 'medium' | 'large' | { width: number | string; height: number | string };
}

const sizeMap = {
  small: { width: 320, height: 180 },
  medium: { width: 560, height: 315 },
  large: { width: 900, height: 450 },
};

export const YoutubeScreen: React.FC<YoutubeScreenProps> = ({ videoId, size = 'large' }) => {
  let resolvedSize;
  if (typeof size === 'string') {
    resolvedSize = sizeMap[size] || sizeMap['large'];
  } else {
    resolvedSize = {
      width: size.width === '100vw' ? '100vw' : size.width,
      height: size.height === '100vh' ? '100vh' : size.height,
    };
  }

  return (
    <div
      style={{
        position: 'relative',
        width: typeof resolvedSize.width === 'number' ? `${resolvedSize.width}px` : resolvedSize.width,
        height: typeof resolvedSize.height === 'number' ? `${resolvedSize.height}px` : resolvedSize.height,
        borderRadius: 1,
        overflow: 'hidden',
        boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
      }}
    >
      <iframe
        width={typeof resolvedSize.width === 'number' ? resolvedSize.width : '100%'}
        height={typeof resolvedSize.height === 'number' ? resolvedSize.height : '100%'}
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default YoutubeScreen; 