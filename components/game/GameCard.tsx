import Image from 'next/image';
import Link from 'next/link';
import { StarIcon, FireIcon } from '@heroicons/react/24/solid';

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  rating?: number;
  popularity?: number;
  isFeatured?: boolean;
  releaseDate?: string;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  category,
  rating = 4.5,
  popularity = 1000,
  isFeatured = false,
  releaseDate,
}) => {
  return (
    <div className={`game-card card ${isFeatured ? 'md:col-span-2' : ''}`}>
      <div className="relative h-48">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium">
          {category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FireIcon className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium">{popularity}</span>
          </div>
        </div>

        <div className="game-card-content">
          <div className="space-y-2">
            <p className="text-sm">{description}</p>
            {releaseDate && (
              <p className="text-sm text-gray-300">发布日期：{releaseDate}</p>
            )}
          </div>
        </div>

        <Link 
          href={`/games/${id}`}
          className="btn-primary block w-full text-center"
        >
          立即玩
        </Link>
      </div>
    </div>
  );
};

export default GameCard; 