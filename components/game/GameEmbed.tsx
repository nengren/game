import { useState } from 'react';

interface GameEmbedProps {
  gameUrl: string;
  title: string;
}

const GameEmbed: React.FC<GameEmbedProps> = ({ gameUrl, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden">
      {/* 加载进度条 */}
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
          <div className="h-full bg-primary animate-pulse" />
        </div>
      )}

      {/* 游戏iframe */}
      <iframe
        src={gameUrl}
        title={title}
        className="w-full aspect-video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={handleLoad}
      />

      {/* 全屏按钮 */}
      <button
        onClick={toggleFullscreen}
        className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
        aria-label={isFullscreen ? '退出全屏' : '全屏模式'}
      >
        {isFullscreen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9h6v6M15 9l-6 6" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default GameEmbed; 