import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/utils/icons';

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  rating: number;
  popularity: number;
  releaseDate: string;
}

const GameCard = ({
  id,
  title,
  description,
  imageUrl,
  category,
  rating,
  popularity,
  releaseDate,
}: GameCardProps) => {
  const StarIcon = Icons.Star;
  const FireIcon = Icons.Fire;
  const HeartIcon = Icons.Heart;
  const ShareIcon = Icons.Share;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/games/${id}`}>
        <div className="relative h-48">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 flex space-x-2">
            <button className="p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-colors">
              <HeartIcon className="w-5 h-5" />
            </button>
            <button className="p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75 transition-colors">
              <ShareIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/games/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            {category}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(releaseDate).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-sm text-gray-700">{rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FireIcon className="w-5 h-5 text-red-500" />
            <span className="text-sm text-gray-700">{popularity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard; 