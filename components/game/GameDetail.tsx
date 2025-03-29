import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  StarIcon, 
  HeartIcon, 
  ShareIcon, 
  ChatBubbleLeftIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid, HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import GameEmbed from './GameEmbed';

interface GameDetailProps {
  game: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    developer: string;
    releaseDate: string;
    rating: number;
    features: string[];
    screenshots: string[];
    videoUrl: string;
    gameUrl: string;
  };
}

const GameDetail: React.FC<GameDetailProps> = ({ game }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    // 实现分享功能
    if (navigator.share) {
      navigator.share({
        title: game.title,
        text: game.description,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="game-detail">
      {/* 游戏头部 */}
      <div className="game-header">
        <Image
          src={game.imageUrl}
          alt={game.title}
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-primary/90 px-3 py-1 rounded-full text-sm">
                {game.category}
              </span>
              <div className="flex items-center space-x-1">
                <StarIconSolid className="w-5 h-5 text-yellow-400" />
                <span>{game.rating}/5</span>
              </div>
            </div>
            <p className="text-lg mb-6 line-clamp-2">{game.description}</p>
            <div className="flex items-center space-x-4">
              <button className="btn-primary flex items-center space-x-2">
                <PlayIcon className="w-5 h-5" />
                <span>立即玩</span>
              </button>
              <button
                onClick={handleLike}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                {isLiked ? (
                  <HeartIconSolid className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-6 h-6" />
                )}
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ShareIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => setShowComments(!showComments)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChatBubbleLeftIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 游戏信息 */}
      <div className="game-info">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">游戏信息</h2>
            <div className="space-y-2">
              <p><span className="font-medium">开发商：</span>{game.developer}</p>
              <p><span className="font-medium">发布日期：</span>{game.releaseDate}</p>
              <p><span className="font-medium">游戏类型：</span>{game.category}</p>
              <p><span className="font-medium">评分：</span>{game.rating}/5</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">游戏特点</h2>
            <ul className="list-disc list-inside space-y-2">
              {game.features.map((feature, index) => (
                <li key={index} className="text-gray-600">{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 游戏截图 */}
      <div className="game-screenshots">
        <h2 className="text-xl font-semibold mb-4">游戏截图</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {game.screenshots.map((screenshot, index) => (
            <div key={index} className="relative h-[200px] rounded-lg overflow-hidden">
              <Image
                src={screenshot}
                alt={`${game.title}截图${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 游戏视频 */}
      <div className="game-controls">
        <h2 className="text-xl font-semibold mb-4">游戏预告片</h2>
        <div className="relative pt-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={game.videoUrl}
            title={`${game.title}预告片`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      {/* 游戏嵌入 */}
      <div className="game-controls">
        <h2 className="text-xl font-semibold mb-4">开始游戏</h2>
        <GameEmbed gameUrl={game.gameUrl} title={game.title} />
      </div>

      {/* 评论区 */}
      {showComments && (
        <div className="game-controls">
          <h2 className="text-xl font-semibold mb-4">评论区</h2>
          <div className="space-y-4">
            {/* 这里可以添加评论列表组件 */}
            <p className="text-gray-600">评论区功能开发中...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetail; 