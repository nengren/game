import { useState, useEffect } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline';

interface GameEmbedProps {
  gameUrl: string;
  title: string;
}

const GameEmbed: React.FC<GameEmbedProps> = ({ gameUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFullscreen = () => {
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
      if (!document.fullscreenElement) {
        gameContainer.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="relative bg-black rounded-xl overflow-hidden">
      {/* 游戏容器 */}
      <div id="game-container" className="relative pt-[56.25%]">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={gameUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* 控制栏 */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePlayPause}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isPlaying ? (
              <PauseIcon className="w-6 h-6 text-white" />
            ) : (
              <PlayIcon className="w-6 h-6 text-white" />
            )}
          </button>

          <div className="flex items-center space-x-4">
            <button
              onClick={handleFullscreen}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-sm"
            >
              {isFullscreen ? '退出全屏' : '全屏'}
            </button>
          </div>
        </div>
      </div>

      {/* 加载提示 */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4" />
          <p>游戏加载中...</p>
        </div>
      </div>
    </div>
  );
};

export default GameEmbed; 