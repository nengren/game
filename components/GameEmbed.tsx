import { useState } from 'react';
import { FaExpand, FaCompress } from 'react-icons/fa';

interface GameEmbedProps {
  embedUrl: string;
  title: string;
}

export default function GameEmbed({ embedUrl, title }: GameEmbedProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      
      <button
        onClick={toggleFullscreen}
        className="absolute bottom-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
      >
        {isFullscreen ? <FaCompress /> : <FaExpand />}
      </button>
    </div>
  );
} 